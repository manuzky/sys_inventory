<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    protected $table = 'proveedores';
    
    protected $fillable = [
        'nombre',
        'rif',
        'telefono',
        'email',
        'direccion',
        'estado',
    ];

    protected $casts = [
        'estado' => 'boolean',
    ];
}