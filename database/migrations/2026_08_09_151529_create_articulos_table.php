<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articulos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('categoria_id')->constrained('categorias')->cascadeOnUpdate();
            $table->foreignId('marca_id')->constrained('marcas')->cascadeOnUpdate();
            $table->foreignId('unidad_medida_id')->constrained('unidad_medidas')->cascadeOnUpdate();
            $table->foreignId('ubicacion_id')->constrained('ubicaciones')->cascadeOnUpdate();
            $table->foreignId('estado_id')->constrained('estados_articulo')->cascadeOnUpdate();
            $table->string('tipo_articulo',50);
            $table->string('codigo',100)->unique();
            $table->string('codigo_patrimonial',100)->nullable()->unique();
            $table->string('serial',100)->nullable()->unique();
            $table->string('nombre',255);
            $table->text('descripcion')->nullable();
            $table->decimal('cantidad',12,2)->default(0);
            $table->decimal('stock_minimo',12,2)->default(0);
            $table->date('fecha_adquisicion')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articulos');
    }
};