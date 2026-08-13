<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('salida_detalles', function (Blueprint $table) {
            $table->id();

            $table->foreignId('salida_id')
                ->constrained('salidas')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('articulo_id')
                ->constrained('articulos')
                ->cascadeOnUpdate();

            $table->decimal('cantidad', 12, 2);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('salida_detalles');
    }
};