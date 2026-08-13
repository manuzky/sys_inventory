<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Salida extends Model
{
    use HasFactory;

    protected $fillable = [
        'usuario_id',
        'fecha',
        'motivo',
        'observaciones',
    ];

    protected $casts = [
        'fecha' => 'date',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }
    
    public function detalles()
    {
        return $this->hasMany(SalidaDetalle::class);
    }
}