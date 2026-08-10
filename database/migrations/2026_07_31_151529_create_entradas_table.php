<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('entradas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proveedores_id')->constrained()->cascadeOnUpdate();
            $table->foreignId('users_id')->constrained()->cascadeOnUpdate();
            $table->date('fecha');
            $table->string('tipo_documento',50);
            $table->string('numero_documento',100);
            $table->text('observacion')->nullable();
            $table->boolean('estado')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entradas');
    }
};
