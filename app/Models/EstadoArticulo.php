<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EstadoArticulo extends Model
{
    protected $table='estados_articulo';

    protected $fillable=[
        'nombre',
        'descripcion',
    ];

    public function articuloUnidades(): HasMany
    {
        return $this->hasMany(ArticuloUnidad::class);
    }
}