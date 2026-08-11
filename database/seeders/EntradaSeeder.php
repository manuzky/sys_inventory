<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EntradaSeeder extends Seeder
{
    public function run(): void
    {
        $proveedor1 = DB::table('proveedores')
            ->where('nombre', 'Tecnología Integral C.A.')
            ->value('id');

        $proveedor2 = DB::table('proveedores')
            ->where('nombre', 'Suministros del Oriente C.A.')
            ->value('id');

        $usuario = DB::table('users')
            ->first();

        if (!$usuario) {
            return;
        }

        DB::table('entradas')->insert([
            [
                'proveedores_id' => $proveedor1,
                'users_id' => $usuario->id,
                'fecha' => '2026-03-05',
                'tipo_documento' => 'Factura',
                'numero_documento' => 'FAC-000001',
                'observacion' => 'Entrada de equipos informáticos para pruebas.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'proveedores_id' => $proveedor2,
                'users_id' => $usuario->id,
                'fecha' => '2026-04-12',
                'tipo_documento' => 'Nota de entrega',
                'numero_documento' => 'NE-000015',
                'observacion' => 'Recepción de periféricos y suministros.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'proveedores_id' => $proveedor1,
                'users_id' => $usuario->id,
                'fecha' => '2026-05-20',
                'tipo_documento' => 'Factura',
                'numero_documento' => 'FAC-000023',
                'observacion' => 'Adquisición de equipos para laboratorio.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}