<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PersonnelController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\UnidadMedidaController;
use App\Http\Controllers\UbicacionController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\EstadoArticuloController;

Route::get('/', function () {
    return redirect('/login');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('personnel', PersonnelController::class);
    Route::patch('/personnel/{personnel}/toggle-status', [PersonnelController::class, 'toggleStatus'])->name('personnel.toggle-status');
    
    Route::resource('positions', PositionController::class);
    Route::patch('/positions/{position}/toggle-status', [PositionController::class, 'toggleStatus'])->name('positions.toggle-status');

    Route::resource('permissions', PermissionController::class);
    Route::resource('roles', RoleController::class);

    Route::resource('users', UserController::class);
    Route::patch('/users/{user}/toggle-status', [UserController::class, 'toggleStatus'])->name('users.toggle-status');

    // -------------------------------------------------------------------------------------------------------------------------------

    Route::resource('categorias', CategoriaController::class);
    Route::patch('categorias/{categoria}/toggle-status', [CategoriaController::class, 'toggleStatus'])->name('categorias.toggle-status');

    Route::resource('marcas', MarcaController::class);
    Route::patch('marcas/{marca}/toggle-status', [MarcaController::class, 'toggleStatus'])->name('marcas.toggle-status');

    Route::resource('unidades-medida', UnidadMedidaController::class)->parameters(['unidades-medida' => 'unidadMedida']);
    Route::patch('unidades-medida/{unidadMedida}/toggle-status', [UnidadMedidaController::class, 'toggleStatus'])->name('unidades-medida.toggle-status');

    Route::resource('ubicaciones', UbicacionController::class)->parameters(['ubicaciones'=>'ubicacion']);
    Route::patch('ubicaciones/{ubicacion}/toggle-status', [UbicacionController::class,'toggleStatus'])->name('ubicaciones.toggle-status');

    Route::resource('proveedores', ProveedorController::class)->parameters(['proveedores' => 'proveedor']);});
    Route::patch('proveedores/{proveedor}/toggle-status', [ProveedorController::class, 'toggleStatus'])->name('proveedores.toggle-status');

    Route::resource('estados-articulo',EstadoArticuloController::class)->parameters(['estados-articulo'=>'estadoArticulo']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
