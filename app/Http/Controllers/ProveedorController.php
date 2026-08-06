<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Proveedor;
use App\Http\Requests\StoreProveedorRequest;
use App\Http\Requests\UpdateProveedorRequest;

class ProveedorController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:proveedores.view')->only(['index', 'show']);
        $this->middleware('permission:proveedores.create')->only(['create', 'store']);
        $this->middleware('permission:proveedores.edit')->only(['edit', 'update']);
        $this->middleware('permission:proveedores.delete')->only(['destroy']);
        $this->middleware('permission:proveedores.toggle-status')->only(['toggleStatus']);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function index(Request $request)
    {
        $search = $request->search;

        $proveedores = Proveedor::query()
            ->when($search, function ($query) use ($search) {
                $query->where('nombre', 'like', "%{$search}%")
                    ->orWhere('rif', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Proveedores/Index', [
            'proveedores' => $proveedores,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        return Inertia::render('Proveedores/Create');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreProveedorRequest $request)
    {
        Proveedor::create(
            $request->validated()
        );

        return redirect()->route('proveedores.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Proveedor $proveedor)
    {
        return Inertia::render('Proveedores/Show',[
            'proveedor'=>$proveedor,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Proveedor $proveedor)
    {
        return Inertia::render('Proveedores/Edit', [
            'proveedor' => $proveedor,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateProveedorRequest $request, Proveedor $proveedor)
    {
        $proveedor->update(
            $request->validated()
        );

        return redirect()->route('proveedores.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Proveedor $proveedor)
    {
        $proveedor->delete();

        return redirect()->route('proveedores.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function toggleStatus(Proveedor $proveedor)
    {
        $proveedor->update([
            'estado' => !$proveedor->estado,
        ]);

        return back();
    }
}
