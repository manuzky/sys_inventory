<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MarcaSeeder extends Seeder
{
    public function run(): void
    {
        $marcas = [
            ['nombre' => 'Lenovo', 'descripcion' => 'Fabricante de computadoras y equipos informáticos.'],
            ['nombre' => 'Samsung', 'descripcion' => 'Fabricante de teléfonos, tablets y dispositivos electrónicos.'],
            ['nombre' => 'TP-Link', 'descripcion' => 'Fabricante de equipos de conectividad y redes.'],
            ['nombre' => 'HP', 'descripcion' => 'Fabricante de computadoras, impresoras y periféricos.'],
            ['nombre' => 'Dell', 'descripcion' => 'Fabricante de computadoras y soluciones tecnológicas.'],
            ['nombre' => 'Asus', 'descripcion' => 'Fabricante de computadoras y componentes electrónicos.'],
            ['nombre' => 'Acer', 'descripcion' => 'Fabricante de laptops y equipos informáticos.'],
            ['nombre' => 'Apple', 'descripcion' => 'Fabricante de computadoras y dispositivos móviles.'],
            ['nombre' => 'Logitech', 'descripcion' => 'Fabricante de periféricos y accesorios informáticos.'],
            ['nombre' => 'Epson', 'descripcion' => 'Fabricante de impresoras y equipos de proyección.'],
            ['nombre' => 'Cisco', 'descripcion' => 'Fabricante de infraestructura y equipos de redes.'],
            ['nombre' => 'Ubiquiti', 'descripcion' => 'Fabricante de equipos de conectividad inalámbrica.'],
            ['nombre' => 'APC', 'descripcion' => 'Fabricante de sistemas de alimentación ininterrumpida.'],
            ['nombre' => 'Kingston', 'descripcion' => 'Fabricante de memorias y dispositivos de almacenamiento.'],
        ];

        foreach ($marcas as $marca) {
            $fecha = now()->subDays(rand(30, 1500));

            DB::table('marcas')->updateOrInsert(
                ['nombre' => $marca['nombre']],
                array_merge($marca, [
                    'estado' => true,
                    'created_at' => $fecha,
                    'updated_at' => $fecha,
                ])
            );
        }
    }
}