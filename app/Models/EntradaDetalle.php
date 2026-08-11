<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntradaDetalle extends Model
{
    use HasFactory;

    protected $table = 'entrada_detalles';

    protected $fillable = [
        'entrada_id',
        'articulo_id',
        'cantidad',
        'costo',
    ];

    protected $casts = [
        'cantidad' => 'decimal:2',
        'costo' => 'decimal:2',
    ];

    public function entrada()
    {
        return $this->belongsTo(Entrada::class);
    }

    public function articulo()
    {
        return $this->belongsTo(Articulo::class);
    }
}