<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EntradaDetalle extends Model
{
    use HasFactory;

    protected $fillable = [
        'entrada_id',
        'articulo_id',
        'cantidad',
        'costo',
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