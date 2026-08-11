<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnidadMedidaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('unidad_medidas')->insert([
            [
                'nombre' => 'Unidad',
                'abreviatura' => 'UND',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Caja',
                'abreviatura' => 'CJ',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Paquete',
                'abreviatura' => 'PQT',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Litro',
                'abreviatura' => 'L',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Metro',
                'abreviatura' => 'M',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}