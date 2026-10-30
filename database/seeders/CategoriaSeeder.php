<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $categorias = [
            [
                'nombre' => 'Equipos de Computación',
                'descripcion' => 'Equipos informáticos utilizados para actividades administrativas y técnicas.',
            ],
            [
                'nombre' => 'Periféricos',
                'descripcion' => 'Dispositivos periféricos y accesorios para equipos de computación.',
            ],
            [
                'nombre' => 'Equipos de Red',
                'descripcion' => 'Equipos utilizados para infraestructura y conectividad de red.',
            ],
            [
                'nombre' => 'Dispositivos Móviles',
                'descripcion' => 'Teléfonos inteligentes y dispositivos portátiles.',
            ],
            [
                'nombre' => 'Almacenamiento',
                'descripcion' => 'Dispositivos para almacenamiento y respaldo de información.',
            ],
            [
                'nombre' => 'Energía y Protección',
                'descripcion' => 'Equipos de alimentación eléctrica y protección contra fallas.',
            ],
            [
                'nombre' => 'Impresión',
                'descripcion' => 'Impresoras, escáneres y equipos de impresión.',
            ],
            [
                'nombre' => 'Mobiliario',
                'descripcion' => 'Muebles y elementos para oficinas y espacios de trabajo.',
            ],
            [
                'nombre' => 'Papelería',
                'descripcion' => 'Materiales y suministros de oficina.',
            ],
            [
                'nombre' => 'Limpieza',
                'descripcion' => 'Productos y materiales de limpieza.',
            ],
        ];

        foreach ($categorias as $categoria) {
            $fecha = now()->subDays(rand(30, 1500));

            DB::table('categorias')->updateOrInsert(
                ['nombre' => $categoria['nombre']],
                array_merge($categoria, [
                    'estado' => true,
                    'created_at' => $fecha,
                    'updated_at' => $fecha,
                ])
            );
        }
    }
}