<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProveedorSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('proveedores')->insert([
            [
                'nombre' => 'Tecnología Integral C.A.',
                'rif' => 'J-12345678-1',
                'telefono' => '0414-1234567',
                'email' => 'ventas@tecnologiaintegral.test',
                'direccion' => 'Av. Principal, Barcelona',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Suministros del Oriente C.A.',
                'rif' => 'J-23456789-2',
                'telefono' => '0416-2345678',
                'email' => 'contacto@suministrosoriente.test',
                'direccion' => 'Zona Industrial, Puerto La Cruz',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Soluciones Informáticas 2026',
                'rif' => 'J-34567890-3',
                'telefono' => '0424-3456789',
                'email' => 'ventas@solucionesinfo.test',
                'direccion' => 'Centro Empresarial, Lechería',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Distribuidora El Almacén',
                'rif' => 'J-45678901-4',
                'telefono' => '0412-4567890',
                'email' => null,
                'direccion' => 'Calle Comercial, Barcelona',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}