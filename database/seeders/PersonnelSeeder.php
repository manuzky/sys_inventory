<?php

namespace Database\Seeders;

use App\Models\Personnel;
use App\Models\Position;
use App\Models\PersonnelPositionHistory;
use Illuminate\Database\Seeder;

class PersonnelSeeder extends Seeder
{
    public function run(): void
    {
        $adminPosition = Position::where('name', 'Administrador del Sistema')->firstOrFail();

        $personnel = Personnel::updateOrCreate(
            ['id_number' => '00000001'],
            [
                'first_name' => 'Administrador',
                'last_name' => 'Sistema',

                'document_type' => 'V',
                'id_number' => '00000001',

                'birth_date' => '1990-01-01',
                'gender' => 'male',
                'marital_status' => 'single',

                'email' => 'admin@system.com',

                'phone' => '04120000000',
                'secondary_phone' => null,

                'address' => 'Oficina Principal',

                'hire_date' => now()->toDateString(),

                'status' => 'active',

                'photo' => null,
                'curriculum' => null,
            ]
        );

        PersonnelPositionHistory::updateOrCreate(
            [
                'personnel_id' => $personnel->id,
                'position_id' => $adminPosition->id,
            ],
            [
                'start_date' => $personnel->hire_date,
                'end_date' => null,
                'assigned_by' => 'Seeder',
            ]
        );
    }
}