<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProveedorSeeder extends Seeder
{
    public function run(): void
    {
        $proveedores = [
            [
                'nombre' => 'Tecnología Integral C.A.',
                'rif' => 'J-12345678-1',
                'telefono' => '0414-1234567',
                'email' => 'ventas@tecnologiaintegral.test',
                'direccion' => 'Av. Principal, Barcelona',
            ],
            [
                'nombre' => 'Soluciones Informáticas 2026',
                'rif' => 'J-34567890-3',
                'telefono' => '0424-3456789',
                'email' => 'ventas@solucionesinfo.test',
                'direccion' => 'Centro Empresarial, Lechería',
            ],
            [
                'nombre' => 'Distribuidora El Almacén',
                'rif' => 'J-45678901-4',
                'telefono' => '0412-4567890',
                'email' => null,
                'direccion' => 'Calle Comercial, Barcelona',
            ],
            [
                'nombre' => 'CompuServicios Oriente C.A.',
                'rif' => 'J-56789012-5',
                'telefono' => '0414-5678901',
                'email' => 'ventas@compuservicios.test',
                'direccion' => 'Av. Intercomunal, Puerto La Cruz',
            ],
            [
                'nombre' => 'Inversiones Digitales del Caribe',
                'rif' => 'J-67890123-6',
                'telefono' => '0424-6789012',
                'email' => 'contacto@digitalcaribe.test',
                'direccion' => 'Sector Venecia, Lechería',
            ],
            [
                'nombre' => 'Comercializadora TecnoPlus',
                'rif' => 'J-78901234-7',
                'telefono' => '0412-7890123',
                'email' => 'info@tecnoplus.test',
                'direccion' => 'Zona Industrial, Barcelona',
            ],
            [
                'nombre' => 'Suministros y Equipos del Oriente',
                'rif' => 'J-89012345-8',
                'telefono' => '0414-8901234',
                'email' => null,
                'direccion' => 'Av. Municipal, Puerto La Cruz',
            ],
        ];

        foreach ($proveedores as $proveedor) {
            $fecha = now()->subDays(rand(30, 1500));

            DB::table('proveedores')->updateOrInsert(
                ['rif' => $proveedor['rif']],
                array_merge($proveedor, [
                    'estado' => true,
                    'created_at' => $fecha,
                    'updated_at' => $fecha,
                ])
            );
        }
    }
}