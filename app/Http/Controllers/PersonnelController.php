<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\StorePersonnelRequest;
use App\Http\Requests\UpdatePersonnelRequest;
use App\Models\Personnel;
use App\Models\Position;

class PersonnelController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:personnel.view')->only(['index', 'show']);
        $this->middleware('permission:personnel.create')->only(['create', 'store']);
        $this->middleware('permission:personnel.edit')->only(['edit', 'update']);
        // $this->middleware('permission:personnel.delete')->only(['destroy']);
        $this->middleware('permission:personnel.toggle-status')->only(['toggleStatus']);
    }
    
    /*------------------------------------------------------------------------------------------------------------------------------------------*/
    
    public function index(Request $request)
    {
        $search = $request->search;

        $personnels = Personnel::query()
            ->when($search, function ($query) use ($search) {
                $query->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('id_number', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy("id","desc")
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Personnel/Index', [
            'personnels' => $personnels,
            'filters' => [
                'search' => $search,
            ],
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

    public function store(StorePersonnelRequest $request)
    {
        $validated = $request->validated();

        $photoPath = $request->file('photo')
            ? $request->file('photo')->store('personnel/photos', 'public')
            : null;

        $curriculumPath = $request->file('curriculum')
            ? $request->file('curriculum')->store('personnel/curriculums', 'public')
            : null;

        DB::transaction(function () use ($validated, $photoPath, $curriculumPath) {

           $email = $this->buildEmail($validated);

            $phone = null;

            if (!empty($validated['phone'])) {
                $phone = $validated['phone_code'] . $validated['phone'];
            }

            $secondaryPhone = null;

            if (!empty($validated['secondary_phone'])) {
                $secondaryPhone =
                    $validated['secondary_phone_code'] .
                    $validated['secondary_phone'];
            }

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

    public function update(UpdatePersonnelRequest $request, Personnel $personnel)
    {
        $validated = $request->validated();

        $email = $this->buildEmail($validated);

        $phone = $validated['phone']
            ? $validated['phone_code'] . $validated['phone']
            : null;

        $secondaryPhone = null;

        if (!empty($validated['secondary_phone'])) {
            $secondaryPhone =
                $validated['secondary_phone_code'] .
                $validated['secondary_phone'];
        }

        $photoPath = $personnel->photo;
        $curriculumPath = $personnel->curriculum;

        if ($request->boolean('photo_remove')) {
            if ($personnel->photo) {

                Storage::disk('public')
                    ->delete($personnel->photo);
            }
            $photoPath = null;
        }

        if ($request->boolean('curriculum_remove')) {
            if ($personnel->curriculum) {
                Storage::disk('public')
                    ->delete($personnel->curriculum);
            }
            $curriculumPath = null;
        }

        if ($request->hasFile('photo')) {
            if ($personnel->photo) {

                Storage::disk('public')
                    ->delete($personnel->photo);

            }
            $photoPath = $request->file('photo')
                ->store('personnel/photos', 'public');
        }

        if ($request->hasFile('curriculum')) {
            if ($personnel->curriculum) {

                Storage::disk('public')
                    ->delete($personnel->curriculum);
            }
            $curriculumPath = $request->file('curriculum')
                ->store('personnel/curriculums', 'public');
        }

        DB::transaction(function () use ( $personnel, $validated, $email, $phone, $secondaryPhone, $photoPath, $curriculumPath ) {

            $personnel->update([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],

                'document_type' => $validated['document_type'],
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

            $currentPosition = $personnel->positionsHistory()
                ->whereNull('end_date')
                ->first();

            if (!$currentPosition || $currentPosition->position_id != $validated['position_id']) {

                if ($currentPosition) {
                    /** @var \App\Models\PersonnelPositionHistory|null $currentPosition */
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

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    private function buildEmail(array $validated): string
    {
        $domain = $validated['email_domain'] === 'other'
            ? $validated['email_custom_domain']
            : $validated['email_domain'];

        if (!str_starts_with($domain, '@')) {
            $domain = '@' . $domain;
        }

        return $validated['email_local'] . $domain;
    }
}
