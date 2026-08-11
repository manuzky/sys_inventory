<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticuloSeeder extends Seeder
{
    public function run(): void
    {
        $categoriaComputacion = DB::table('categorias')
            ->where('nombre', 'Equipos de Computación')
            ->value('id');

        $categoriaPerifericos = DB::table('categorias')
            ->where('nombre', 'Periféricos')
            ->value('id');

        $categoriaRed = DB::table('categorias')
            ->where('nombre', 'Equipos de Red')
            ->value('id');

        $marcaLenovo = DB::table('marcas')
            ->where('nombre', 'Lenovo')
            ->value('id');

        $marcaHP = DB::table('marcas')
            ->where('nombre', 'HP')
            ->value('id');

        $marcaDell = DB::table('marcas')
            ->where('nombre', 'Dell')
            ->value('id');

        $marcaLogitech = DB::table('marcas')
            ->where('nombre', 'Logitech')
            ->value('id');

        $marcaTPLink = DB::table('marcas')
            ->where('nombre', 'TP-Link')
            ->value('id');

        $unidad = DB::table('unidad_medidas')
            ->where('nombre', 'Unidad')
            ->value('id');

        $almacen = DB::table('ubicaciones')
            ->where('nombre', 'Almacén Principal')
            ->value('id');

        $laboratorio = DB::table('ubicaciones')
            ->where('nombre', 'Laboratorio de Computación')
            ->value('id');

        $servidores = DB::table('ubicaciones')
            ->where('nombre', 'Sala de Servidores')
            ->value('id');

        $disponible = DB::table('estados_articulo')
            ->where('nombre', 'Disponible')
            ->value('id');

        $asignado = DB::table('estados_articulo')
            ->where('nombre', 'Asignado')
            ->value('id');

        $mantenimiento = DB::table('estados_articulo')
            ->where('nombre', 'En Mantenimiento')
            ->value('id');

        DB::table('articulos')->insert([
            [
                'categoria_id' => $categoriaComputacion,
                'marca_id' => $marcaLenovo,
                'unidad_medida_id' => $unidad,
                'ubicacion_id' => $laboratorio,
                'estado_id' => $asignado,
                'tipo_articulo' => 'Activo',
                'codigo' => 'ART-0001',
                'codigo_patrimonial' => 'PAT-0001',
                'serial' => 'LEN-TEST-001',
                'nombre' => 'Laptop Lenovo ThinkPad',
                'descripcion' => 'Equipo portátil para actividades administrativas.',
                'cantidad' => 1,
                'stock_minimo' => 1,
                'fecha_adquisicion' => '2026-01-15',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'categoria_id' => $categoriaComputacion,
                'marca_id' => $marcaDell,
                'unidad_medida_id' => $unidad,
                'ubicacion_id' => $laboratorio,
                'estado_id' => $disponible,
                'tipo_articulo' => 'Activo',
                'codigo' => 'ART-0002',
                'codigo_patrimonial' => 'PAT-0002',
                'serial' => 'DEL-TEST-001',
                'nombre' => 'Computadora Dell OptiPlex',
                'descripcion' => 'Computadora de escritorio para laboratorio.',
                'cantidad' => 5,
                'stock_minimo' => 2,
                'fecha_adquisicion' => '2026-02-10',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'categoria_id' => $categoriaComputacion,
                'marca_id' => $marcaHP,
                'unidad_medida_id' => $unidad,
                'ubicacion_id' => $almacen,
                'estado_id' => $disponible,
                'tipo_articulo' => 'Activo',
                'codigo' => 'ART-0003',
                'codigo_patrimonial' => 'PAT-0003',
                'serial' => 'HP-TEST-001',
                'nombre' => 'Monitor HP 24 pulgadas',
                'descripcion' => 'Monitor LED para estaciones de trabajo.',
                'cantidad' => 8,
                'stock_minimo' => 2,
                'fecha_adquisicion' => '2026-02-20',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'categoria_id' => $categoriaPerifericos,
                'marca_id' => $marcaLogitech,
                'unidad_medida_id' => $unidad,
                'ubicacion_id' => $almacen,
                'estado_id' => $disponible,
                'tipo_articulo' => 'Suministro',
                'codigo' => 'ART-0004',
                'codigo_patrimonial' => null,
                'serial' => null,
                'nombre' => 'Teclado USB Logitech',
                'descripcion' => 'Teclado USB para equipos de computación.',
                'cantidad' => 20,
                'stock_minimo' => 5,
                'fecha_adquisicion' => '2026-03-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'categoria_id' => $categoriaPerifericos,
                'marca_id' => $marcaLogitech,
                'unidad_medida_id' => $unidad,
                'ubicacion_id' => $almacen,
                'estado_id' => $disponible,
                'tipo_articulo' => 'Suministro',
                'codigo' => 'ART-0005',
                'codigo_patrimonial' => null,
                'serial' => null,
                'nombre' => 'Mouse USB Logitech',
                'descripcion' => 'Mouse óptico USB.',
                'cantidad' => 25,
                'stock_minimo' => 5,
                'fecha_adquisicion' => '2026-03-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'categoria_id' => $categoriaRed,
                'marca_id' => $marcaTPLink,
                'unidad_medida_id' => $unidad,
                'ubicacion_id' => $servidores,
                'estado_id' => $disponible,
                'tipo_articulo' => 'Equipo',
                'codigo' => 'ART-0006',
                'codigo_patrimonial' => 'PAT-0006',
                'serial' => 'TPL-TEST-001',
                'nombre' => 'Switch TP-Link 24 puertos',
                'descripcion' => 'Switch para infraestructura de red.',
                'cantidad' => 3,
                'stock_minimo' => 1,
                'fecha_adquisicion' => '2026-03-15',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'categoria_id' => $categoriaComputacion,
                'marca_id' => $marcaDell,
                'unidad_medida_id' => $unidad,
                'ubicacion_id' => $almacen,
                'estado_id' => $mantenimiento,
                'tipo_articulo' => 'Activo',
                'codigo' => 'ART-0007',
                'codigo_patrimonial' => 'PAT-0007',
                'serial' => 'DEL-TEST-002',
                'nombre' => 'Servidor Dell PowerEdge',
                'descripcion' => 'Servidor destinado a pruebas de infraestructura.',
                'cantidad' => 1,
                'stock_minimo' => 1,
                'fecha_adquisicion' => '2026-04-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}