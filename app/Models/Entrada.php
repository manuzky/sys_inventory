<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entrada extends Model
{
    protected $table = 'entradas';

    protected $fillable = [
        'proveedores_id',
        'users_id',
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

    public function usuario()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function detalles()
    {
        return $this->hasMany(EntradaDetalle::class);
    }
}