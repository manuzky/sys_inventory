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

            $table->foreignId('categoria_id')
                ->constrained('categorias')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('marca_id')
                ->constrained('marcas')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('unidad_medida_id')
                ->constrained('unidad_medidas')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->string('tipo_articulo');
            $table->string('nombre');
            $table->string('modelo')->nullable();
            $table->text('descripcion')->nullable();

            $table->boolean('control_individual')->default(false);
            $table->boolean('maneja_serial')->default(false);

            $table->decimal('stock', 12, 2)->default(0);
            $table->decimal('stock_minimo', 12, 2)->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articulos');
    }
};