<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articulo_unidades', function (Blueprint $table) {
            $table->id();

            $table->foreignId('articulo_id')
                ->constrained('articulos')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->string('identificador');
            $table->string('serial')->nullable();

            $table->foreignId('ubicacion_id')
                ->constrained('ubicaciones')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('estado_id')
                ->constrained('estados_articulo')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->date('fecha_adquisicion');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articulo_unidades');
    }
};