<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Articulo extends Model
{
    protected $table = 'articulos';

    protected $fillable = [
        'categoria_id',
        'marca_id',
        'unidad_medida_id',
        'referencia_id',
        'tipo_articulo',
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
        'stock_minimo' => 'decimal:2',
    ];

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }

    public function marca(): BelongsTo
    {
        return $this->belongsTo(Marca::class);
    }

    public function unidadMedida()
    {
        return $this->belongsTo(UnidadMedida::class, 'unidad_medida_id');
    }

    public function referencia()
    {
        return $this->belongsTo(Referencia::class);
    }
}