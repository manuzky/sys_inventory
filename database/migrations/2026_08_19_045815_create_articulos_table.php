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

            $table->foreignId('referencia_id')
                ->nullable()
                ->constrained('referencias')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->string('nombre');
            $table->string('modelo');
            $table->text('descripcion')->nullable();

            $table->boolean('control_individual')->default(false);
            $table->boolean('maneja_serial')->default(false);

            $table->decimal('stock', 12, 2)->default(0);
            $table->unsignedInteger('stock_minimo')->default(5);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articulos');
    }
};