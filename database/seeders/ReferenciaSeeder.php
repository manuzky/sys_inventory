<?php

namespace Database\Seeders;

use App\Models\Referencia;
use Illuminate\Database\Seeder;

class ReferenciaSeeder extends Seeder
{
    public function run(): void
    {
        Referencia::create([
            'codigo' => 'LAP',
            'descripcion' => 'Laptop',
            'estado' => true,
        ]);

        Referencia::create([
            'codigo' => 'TAB',
            'descripcion' => 'Tablet',
            'estado' => true,
        ]);

        Referencia::create([
            'codigo' => 'TEL',
            'descripcion' => 'Teléfono',
            'estado' => true,
        ]);
    }
}