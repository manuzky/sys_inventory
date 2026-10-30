<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Articulo extends Model
{
    protected $table = 'articulos';

    protected $fillable = [
        'categoria_id',
        'marca_id',
        'referencia_id',
        'nombre',
        'modelo',
        'descripcion',
        'control_individual',
        'maneja_serial',
        'stock',
        'stock_minimo',
    ];

    protected $casts = [
        'control_individual' => 'boolean',
        'maneja_serial' => 'boolean',
        'stock' => 'decimal:2',
        'stock_minimo' => 'integer',
    ];

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }

    public function marca(): BelongsTo
    {
        return $this->belongsTo(Marca::class);
    }

    public function referencia()
    {
        return $this->belongsTo(Referencia::class);
    }
    public function entradaDetalles(): HasMany
    {
        return $this->hasMany(EntradaDetalle::class);
    }

    public function unidades(): HasMany
    {
        return $this->hasMany(ArticuloUnidad::class);
    }
}