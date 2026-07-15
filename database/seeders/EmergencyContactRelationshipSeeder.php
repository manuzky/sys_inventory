<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EmergencyContactRelationship;

class EmergencyContactRelationshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $relationships = [
            'Madre',
            'Padre',
            'Hermano',
            'Hermana',
            'Cónyuge',
            'Hijo',
            'Hija',
            'Familiar',
            'Amigo',
            'Vecino',
            'Tutor',
            'Otro',
        ];


        foreach ($relationships as $relationship) {
            EmergencyContactRelationship::create([
                'name' => $relationship
            ]);
        }
    }
}
