<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SalidaDetalle extends Model
{
    use HasFactory;

    protected $table = 'salida_detalles';

    protected $fillable = [
        'salida_id',
        'articulo_id',
        'cantidad',
    ];

    protected $casts = [
        'cantidad' => 'decimal:2',
    ];

    public function salida()
    {
        return $this->belongsTo(Salida::class);
    }

    public function articulo()
    {
        return $this->belongsTo(Articulo::class);
    }
}