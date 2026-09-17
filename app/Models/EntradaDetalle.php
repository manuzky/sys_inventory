<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EntradaDetalle extends Model
{
    protected $table = 'entradas_detalle';

    protected $fillable = [
        'entrada_id',
        'articulo_id',
        'cantidad',
    ];

    protected $casts = [
        'cantidad' => 'decimal:2',
    ];

    public function entrada(): BelongsTo
    {
        return $this->belongsTo(Entrada::class);
    }

    public function articulo(): BelongsTo
    {
        return $this->belongsTo(Articulo::class);
    }
}