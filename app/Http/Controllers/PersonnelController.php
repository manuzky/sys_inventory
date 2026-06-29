<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use App\Models\Personnel;
use App\Models\Position;

class PersonnelController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:personnel.view')->only(['index', 'show']);
        $this->middleware('permission:personnel.create')->only(['create', 'store']);
        $this->middleware('permission:personnel.edit')->only(['edit', 'update']);
        $this->middleware('permission:personnel.delete')->only(['destroy']);
        $this->middleware('permission:personnel.toggle-status')->only(['toggleStatus']);
    }
    
    /*------------------------------------------------------------------------------------------------------------------------------------------*/
    
    public function index()
    {
        $personnels = Personnel::query()
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Personnel/Index', [
            'personnels' => $personnels,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        return Inertia::render('Personnel/Create', [
            'positions' => Position::where('active', true)->get()
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],

            // Documento
            'document_type' => ['required', 'in:V,E'],
            'id_number' => ['required', 'string', 'max:20', 'unique:personnels,id_number'],

            // Datos personales
            'birth_date' => ['required', 'date'],
            'gender' => ['required', 'in:male,female'],
            'marital_status' => ['required', 'in:single,married,divorced,widowed'],

            // Email (form dividido)
            'email_local' => ['required', 'string', 'max:100'],
            'email_domain' => ['required', 'string'],
            'email_custom_domain' => ['nullable', 'string', 'max:255'],

            // Teléfonos
            'phone_code' => ['nullable', 'string'],
            'phone' => ['nullable', 'digits:7'],

            'secondary_phone_code' => ['nullable', 'string'],
            'secondary_phone' => ['nullable', 'digits:7'],

            'address' => ['nullable', 'string'],

            // Laboral
            'hire_date' => ['required', 'date'],
            'position_id' => ['required', 'exists:positions,id'],

            // Archivos
            'photo' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'curriculum' => [
                'nullable',
                'file',
                'mimes:pdf',
                'max:5120',
            ],
        ]);

        $photoPath = $request->file('photo')
            ? $request->file('photo')->store('personnel/photos', 'public')
            : null;

        $curriculumPath = $request->file('curriculum')
            ? $request->file('curriculum')->store('personnel/curriculums', 'public')
            : null;

        DB::transaction(function () use ($validated, $photoPath, $curriculumPath) {

            // =========================
            // EMAIL NORMALIZADO
            // =========================
            $domain = $validated['email_domain'];

            if ($domain === 'other') {
                $domain = $validated['email_custom_domain'];
            }

            if (!str_starts_with($domain, '@')) {
                $domain = '@' . $domain;
            }

            $email = $validated['email_local'] . $domain;

            // =========================
            // TELÉFONO PRINCIPAL
            // =========================
            $phone = null;

            if (!empty($validated['phone'])) {
                $phone = $validated['phone_code'] . $validated['phone'];
            }

            // =========================
            // TELÉFONO SECUNDARIO
            // =========================
            $secondaryPhone = null;

            if (!empty($validated['secondary_phone'])) {
                $secondaryPhone =
                    $validated['secondary_phone_code'] .
                    $validated['secondary_phone'];
            }

            // =========================
            // CREAR PERSONAL
            // =========================
            $personnel = Personnel::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],

                'document_type' => $validated['document_type'],
                'id_number' => $validated['id_number'],

                'birth_date' => $validated['birth_date'],
                'gender' => $validated['gender'],
                'marital_status' => $validated['marital_status'],

                'email' => $email,
                'phone' => $phone,
                'secondary_phone' => $secondaryPhone,

                'address' => $validated['address'] ?? null,

                'hire_date' => $validated['hire_date'],
                'status' => 'active',

                'photo' => $photoPath,
                'curriculum' => $curriculumPath,
            ]);

            // =========================
            // HISTORIAL DE CARGO
            // =========================
            $personnel->positionsHistory()->create([
                'position_id' => $validated['position_id'],
                'start_date' => $validated['hire_date'],
                'end_date' => null,
            ]);
        });

        return redirect()->route('personnel.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Personnel $personnel)
    {
        $personnel->load(['positionsHistory.position']);

        $currentPosition = $personnel->positionsHistory()
            ->whereNull('end_date')
            ->with('position')
            ->first();

        $history = $personnel->positionsHistory()
            ->with('position')
            ->orderByDesc('start_date')
            ->get();

        return Inertia::render('Personnel/Show', [
            'personnel' => $personnel,
            'current_position' => $currentPosition,
            'history' => $history,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Personnel $personnel)
    {
        $currentPosition = $personnel->positionsHistory()
            ->whereNull('end_date')
            ->first();

        $positions = Position::where('active', true)->get();

        if (
            $currentPosition &&
            !$positions->contains('id', $currentPosition->position_id)
        ) {
            $positions->push(
                Position::find($currentPosition->position_id)
            );
        }

        return Inertia::render('Personnel/Edit', [
            'personnel' => $personnel,
            'positions' => $positions,
            'current_position_id' => $currentPosition?->position_id,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(Request $request, Personnel $personnel)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],

            // Documento
            'id_number' => [
                'required',
                'string',
                'max:20',
                'unique:personnels,id_number,' . $personnel->id,
            ],

            // Email (form dividido)
            'email_local' => ['required', 'string', 'max:100'],
            'email_domain' => ['required', 'string'],
            'email_custom_domain' => ['nullable', 'string', 'max:255'],

            // Datos personales
            'birth_date' => ['required', 'date'],
            'gender' => ['required', 'in:male,female'],
            'marital_status' => ['required', 'in:single,married,divorced,widowed'],

            // Teléfonos
            'phone_code' => ['nullable', 'string'],
            'phone' => ['nullable', 'digits:7'],

            'secondary_phone_code' => ['nullable', 'string'],
            'secondary_phone' => ['nullable', 'digits:7'],

            'address' => ['nullable', 'string'],

            // Laboral
            'hire_date' => ['required', 'date'],
            'position_id' => ['required', 'exists:positions,id'],

            // Archivos
            'photo' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'curriculum' => [
                'nullable',
                'file',
                'mimes:pdf',
                'max:5120',
            ],
        ]);

        // =========================
        // EMAIL NORMALIZADO
        // =========================
        $domain = $validated['email_domain'];

        if ($domain === 'other') {
            $domain = $validated['email_custom_domain'];
        }

        if (!str_starts_with($domain, '@')) {
            $domain = '@' . $domain;
        }

        $email = $validated['email_local'] . $domain;

        // =========================
        // TELÉFONO PRINCIPAL
        // =========================
        $phone = null;

        if (!empty($validated['phone'])) {
            $phone = $validated['phone_code'] . $validated['phone'];
        }

        // =========================
        // TELÉFONO SECUNDARIO
        // =========================
        $secondaryPhone = null;

        if (!empty($validated['secondary_phone'])) {
            $secondaryPhone =
                $validated['secondary_phone_code'] .
                $validated['secondary_phone'];
        }

        // =========================
        // ARCHIVOS
        // =========================
        $photoPath = $personnel->photo;
        $curriculumPath = $personnel->curriculum;

        if ($request->hasFile('photo')) {
            if ($personnel->photo) {
                Storage::disk('public')->delete($personnel->photo);
            }

            $photoPath = $request->file('photo')
                ->store('personnel/photos', 'public');
        }

        if ($request->hasFile('curriculum')) {
            if ($personnel->curriculum) {
                Storage::disk('public')->delete($personnel->curriculum);
            }

            $curriculumPath = $request->file('curriculum')
                ->store('personnel/curriculums', 'public');
        }

        DB::transaction(function () use (
            $personnel,
            $validated,
            $email,
            $phone,
            $secondaryPhone,
            $photoPath,
            $curriculumPath
        ) {

            // =========================
            // ACTUALIZAR PERSONAL
            // =========================
            $personnel->update([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],

                'id_number' => $validated['id_number'],

                'email' => $email,

                'birth_date' => $validated['birth_date'],
                'gender' => $validated['gender'],
                'marital_status' => $validated['marital_status'],

                'phone' => $phone,
                'secondary_phone' => $secondaryPhone,

                'address' => $validated['address'] ?? null,

                'hire_date' => $validated['hire_date'],

                'photo' => $photoPath,
                'curriculum' => $curriculumPath,
            ]);

            // =========================
            // HISTORIAL DE CARGO
            // =========================
            $currentPosition = $personnel->positionsHistory()
                ->whereNull('end_date')
                ->first();

            if (!$currentPosition || $currentPosition->position_id != $validated['position_id']) {

                if ($currentPosition) {
                    $currentPosition->update([
                        'end_date' => now(),
                    ]);
                }

                $personnel->positionsHistory()->create([
                    'position_id' => $validated['position_id'],
                    'start_date' => $validated['hire_date'],
                    'end_date' => null,
                ]);
            }
        });

        return redirect()
            ->route('personnel.index')
            ->with('success', 'Personal actualizado correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Personnel $personnel)
    {
        // Here's not a real delete, just a status change to 'inactive' to keep the data for historical purposes.
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function toggleStatus(Personnel $personnel)
    {
        $personnel->status = match ($personnel->status) {
            'active' => 'inactive',
            'inactive' => 'active',
            default => 'inactive',
        };

        $personnel->save();

        return back();
    }
}
