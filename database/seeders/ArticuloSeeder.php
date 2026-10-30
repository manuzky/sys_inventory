<?php

namespace Database\Seeders;

use App\Models\Articulo;
use App\Models\Categoria;
use App\Models\Marca;
use App\Models\Referencia;
use Illuminate\Database\Seeder;

class ArticuloSeeder extends Seeder
{
    public function run(): void
    {
        $articulos = [
            // Equipos de computación
            [
                'categoria' => 'Equipos de Computación',
                'marca' => 'Lenovo',
                'referencia' => 'LAP',
                'nombre' => 'Laptop Lenovo ThinkPad E14',
                'modelo' => 'ThinkPad E14 Gen 4',
                'descripcion' => 'Laptop para actividades administrativas y profesionales.',
                'control_individual' => true,
                'maneja_serial' => true,
                'stock_minimo' => 3,
            ],
            [
                'categoria' => 'Equipos de Computación',
                'marca' => 'HP',
                'referencia' => 'LAP',
                'nombre' => 'Laptop HP ProBook 450',
                'modelo' => 'ProBook 450 G9',
                'descripcion' => 'Laptop empresarial para trabajo de oficina.',
                'control_individual' => true,
                'maneja_serial' => true,
                'stock_minimo' => 3,
            ],
            [
                'categoria' => 'Equipos de Computación',
                'marca' => 'Dell',
                'referencia' => 'CPU',
                'nombre' => 'Computadora Dell OptiPlex',
                'modelo' => 'OptiPlex 7090',
                'descripcion' => 'Computadora de escritorio para estaciones de trabajo.',
                'control_individual' => true,
                'maneja_serial' => true,
                'stock_minimo' => 3,
            ],

            // Periféricos
            [
                'categoria' => 'Periféricos',
                'marca' => 'Samsung',
                'referencia' => 'MON',
                'nombre' => 'Monitor Samsung 24 pulgadas',
                'modelo' => 'Essential Monitor S3',
                'descripcion' => 'Monitor LED para estaciones de trabajo.',
                'control_individual' => true,
                'maneja_serial' => true,
                'stock_minimo' => 3,
            ],
            [
                'categoria' => 'Periféricos',
                'marca' => 'Logitech',
                'referencia' => 'MON',
                'nombre' => 'Teclado Logitech',
                'modelo' => 'K120',
                'descripcion' => 'Teclado USB para equipos de escritorio.',
                'control_individual' => false,
                'maneja_serial' => false,
                'stock_minimo' => 10,
            ],
            [
                'categoria' => 'Periféricos',
                'marca' => 'Logitech',
                'referencia' => 'MON',
                'nombre' => 'Mouse Logitech',
                'modelo' => 'B100',
                'descripcion' => 'Mouse óptico USB para estaciones de trabajo.',
                'control_individual' => false,
                'maneja_serial' => false,
                'stock_minimo' => 10,
            ],

            // Dispositivos móviles
            [
                'categoria' => 'Dispositivos Móviles',
                'marca' => 'Samsung',
                'referencia' => 'TAB',
                'nombre' => 'Tablet Samsung Galaxy Tab A8',
                'modelo' => 'Galaxy Tab A8',
                'descripcion' => 'Tablet para consulta de información y actividades móviles.',
                'control_individual' => true,
                'maneja_serial' => true,
                'stock_minimo' => 2,
            ],
            [
                'categoria' => 'Dispositivos Móviles',
                'marca' => 'Samsung',
                'referencia' => 'TEL',
                'nombre' => 'Teléfono Samsung Galaxy A54',
                'modelo' => 'Galaxy A54 5G',
                'descripcion' => 'Teléfono inteligente para comunicación institucional.',
                'control_individual' => true,
                'maneja_serial' => true,
                'stock_minimo' => 3,
            ],

            // Equipos de red
            [
                'categoria' => 'Equipos de Red',
                'marca' => 'TP-Link',
                'referencia' => 'RTR',
                'nombre' => 'Router TP-Link Archer',
                'modelo' => 'Archer C6',
                'descripcion' => 'Router inalámbrico para conectividad de red.',
                'control_individual' => true,
                'maneja_serial' => true,
                'stock_minimo' => 2,
            ],
            [
                'categoria' => 'Equipos de Red',
                'marca' => 'Cisco',
                'referencia' => 'SWI',
                'nombre' => 'Switch Cisco administrable',
                'modelo' => 'CBS250-24T-4G',
                'descripcion' => 'Switch administrable para infraestructura de red.',
                'control_individual' => true,
                'maneja_serial' => true,
                'stock_minimo' => 2,
            ],

            // Mobiliario
            [
                'categoria' => 'Mobiliario',
                'marca' => 'Dell',
                'referencia' => 'MOB',
                'nombre' => 'Silla ergonómica de oficina',
                'modelo' => 'Ejecutiva estándar',
                'descripcion' => 'Silla ergonómica para puestos de trabajo.',
                'control_individual' => true,
                'maneja_serial' => false,
                'stock_minimo' => 5,
            ],
            [
                'categoria' => 'Mobiliario',
                'marca' => 'Dell',
                'referencia' => 'MOB',
                'nombre' => 'Escritorio de oficina',
                'modelo' => 'Escritorio estándar',
                'descripcion' => 'Escritorio para estaciones de trabajo administrativas.',
                'control_individual' => true,
                'maneja_serial' => false,
                'stock_minimo' => 3,
            ],

            // Papelería y materiales
            [
                'categoria' => 'Papelería',
                'marca' => 'HP',
                'referencia' => 'PAP',
                'nombre' => 'Resma de papel carta',
                'modelo' => '75 g, 500 hojas',
                'descripcion' => 'Resma de papel blanco para impresión y fotocopiado.',
                'control_individual' => false,
                'maneja_serial' => false,
                'stock_minimo' => 20,
            ],
            [
                'categoria' => 'Papelería',
                'marca' => 'HP',
                'referencia' => 'PAP',
                'nombre' => 'Bolígrafo azul',
                'modelo' => 'Punta media',
                'descripcion' => 'Bolígrafo de tinta azul para uso administrativo.',
                'control_individual' => false,
                'maneja_serial' => false,
                'stock_minimo' => 30,
            ],
            [
                'categoria' => 'Papelería',
                'marca' => 'HP',
                'referencia' => 'PAP',
                'nombre' => 'Carpeta manila',
                'modelo' => 'Tamaño carta',
                'descripcion' => 'Carpeta para organización y archivo de documentos.',
                'control_individual' => false,
                'maneja_serial' => false,
                'stock_minimo' => 20,
            ],

            // Limpieza
            [
                'categoria' => 'Limpieza',
                'marca' => 'Samsung',
                'referencia' => 'LIM',
                'nombre' => 'Desinfectante multiuso',
                'modelo' => 'Envase de 1 litro',
                'descripcion' => 'Producto para limpieza y desinfección de superficies.',
                'control_individual' => false,
                'maneja_serial' => false,
                'stock_minimo' => 10,
            ],
            [
                'categoria' => 'Limpieza',
                'marca' => 'Samsung',
                'referencia' => 'LIM',
                'nombre' => 'Bolsa para basura',
                'modelo' => 'Paquete de 10 unidades',
                'descripcion' => 'Bolsas para recolección de residuos.',
                'control_individual' => false,
                'maneja_serial' => false,
                'stock_minimo' => 10,
            ],
        ];

        foreach ($articulos as $datos) {
            $categoria = Categoria::where('nombre', $datos['categoria'])->firstOrFail();
            $marca = Marca::where('nombre', $datos['marca'])->firstOrFail();
            $referencia = Referencia::where('codigo', $datos['referencia'])->firstOrFail();

            $fecha = now()->subDays(rand(30, 1500));

            Articulo::updateOrCreate(
                [
                    'nombre' => $datos['nombre'],
                    'modelo' => $datos['modelo'],
                    'marca_id' => $marca->id,
                ],
                [
                    'categoria_id' => $categoria->id,
                    'referencia_id' => $referencia->id,
                    'descripcion' => $datos['descripcion'],
                    'control_individual' => $datos['control_individual'],
                    'maneja_serial' => $datos['maneja_serial'],
                    'stock' => 0,
                    'stock_minimo' => $datos['stock_minimo'],
                    'created_at' => $fecha,
                    'updated_at' => $fecha,
                ]
            );
        }
    }
}