<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MarcaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('marcas')->insert([
            [
                'nombre' => 'Lenovo',
                'descripcion' => 'Fabricante de equipos informáticos.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'HP',
                'descripcion' => 'Fabricante de computadoras y periféricos.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Dell',
                'descripcion' => 'Fabricante de equipos de computación.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Logitech',
                'descripcion' => 'Fabricante de periféricos.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'TP-Link',
                'descripcion' => 'Fabricante de equipos de conectividad.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}