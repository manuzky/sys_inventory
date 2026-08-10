<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('entrada_detalles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('entrada_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('articulo_id')->constrained()->cascadeOnUpdate();
            $table->decimal('cantidad', 12, 2);
            $table->decimal('costo', 12, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('entrada_detalles');
    }
};