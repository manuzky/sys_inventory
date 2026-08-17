<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnidadMedida extends Model
{
    protected $table = 'unidad_medidas';

    protected $fillable = [
        'nombre',
        'abreviatura',
        'estado',
    ];

    protected $casts = [
        'estado' => 'boolean',
    ];

    public function articulos()
    {
        return $this->hasMany(Articulo::class);
    }
}