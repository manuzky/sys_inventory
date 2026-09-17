<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ubicacion extends Model
{
    protected $table = 'ubicaciones';

    protected $fillable = [
        'nombre',
        'descripcion',
        'estado',
    ];

    public function articuloUnidades(): HasMany
    {
        return $this->hasMany(ArticuloUnidad::class);
    }
}