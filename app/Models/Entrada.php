<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entrada extends Model
{
    protected $table = 'entradas';

    protected $fillable = [
        'proveedores_id',
        'fecha',
        'tipo_documento',
        'numero_documento',
        'observacion',
        'estado',
    ];

    public function proveedor()
    {
        return $this->belongsTo( Proveedor::class, 'proveedores_id' );
    }
}