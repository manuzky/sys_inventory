<?php

namespace Database\Seeders;

use App\Models\Referencia;
use Illuminate\Database\Seeder;

class ReferenciaSeeder extends Seeder
{
    public function run(): void
    {
        $referencias = [
            ['codigo' => 'LAP', 'descripcion' => 'Laptop'],
            ['codigo' => 'TAB', 'descripcion' => 'Tablet'],
            ['codigo' => 'TEL', 'descripcion' => 'Teléfono'],
            ['codigo' => 'CPU', 'descripcion' => 'Computadora de escritorio'],
            ['codigo' => 'MON', 'descripcion' => 'Monitor'],
            ['codigo' => 'IMP', 'descripcion' => 'Impresora'],
            ['codigo' => 'RTR', 'descripcion' => 'Router'],
            ['codigo' => 'SWI', 'descripcion' => 'Switch de red'],
            ['codigo' => 'UPS', 'descripcion' => 'Sistema de alimentación ininterrumpida'],
            ['codigo' => 'SSD', 'descripcion' => 'Unidad de almacenamiento'],
            ['codigo' => 'MOB', 'descripcion' => 'Mobiliario',],
            ['codigo' => 'PAP', 'descripcion' => 'Papelería',],
            ['codigo' => 'LIM', 'descripcion' => 'Limpieza',],
        ];

        foreach ($referencias as $referencia) {
            $fecha = now()->subDays(rand(30, 1500));

            Referencia::updateOrCreate(
                ['codigo' => $referencia['codigo']],
                [
                    'descripcion' => $referencia['descripcion'],
                    'estado' => true,
                    'created_at' => $fecha,
                    'updated_at' => $fecha,
                ]
            );
        }
    }
}