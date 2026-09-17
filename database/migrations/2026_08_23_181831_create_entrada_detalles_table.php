<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('entradas_detalle', function (Blueprint $table) {
            $table->id();

            $table->foreignId('entrada_id')
                ->constrained('entradas')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('articulo_id')
                ->constrained('articulos')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->decimal('cantidad', 12, 2);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('entrada_detalles');
    }
};
