<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    public function run(): void
    {
        $positions = [
            ['name' => 'Administrador del Sistema', 'description' => 'Acceso total al sistema', 'active' => true],
            ['name' => 'Gerente', 'description' => 'Gestión general', 'active' => true],
            ['name' => 'Supervisor', 'description' => 'Supervisión de personal', 'active' => true],
            ['name' => 'Analista', 'description' => 'Análisis de información', 'active' => true],
            ['name' => 'Asistente', 'description' => 'Apoyo administrativo', 'active' => true],
        ];

        foreach ($positions as $position) {
            Position::updateOrCreate(
                ['name' => $position['name']],
                $position
            );
        }
    }
}