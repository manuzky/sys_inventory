<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Articulo extends Model
{
    use HasFactory;

    protected $table = 'articulos';

    protected $fillable = [
        'categoria_id',
        'marca_id',
        'unidad_medida_id',
        'ubicacion_id',
        'estado_id',
        'tipo_articulo',
        'codigo',
        'codigo_patrimonial',
        'serial',
        'nombre',
        'descripcion',
        'cantidad',
        'stock_minimo',
        'fecha_adquisicion',
    ];

    protected $casts = [
        'cantidad' => 'decimal:2',
        'stock_minimo' => 'decimal:2',
        'fecha_adquisicion' => 'date',
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function marca()
    {
        return $this->belongsTo(Marca::class);
    }

    public function unidadMedida()
    {
        return $this->belongsTo(UnidadMedida::class);
    }

    public function ubicacion()
    {
        return $this->belongsTo(Ubicacion::class);
    }

    public function estado()
    {
        return $this->belongsTo(EstadoArticulo::class);
    }

    public function entradaDetalles()
    {
        return $this->hasMany(EntradaDetalle::class, 'articulo_id');
    }
}