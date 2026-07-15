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
        Schema::create('personnel_emergency_contacts', function (Blueprint $table) {

            $table->id();

            // Persona a la que pertenece
            $table->foreignId('personnel_id')
                ->constrained()
                ->cascadeOnDelete();

            // Tipo de relación
            $table->foreignId('relationship_id')->constrained('emergency_contact_relationships');

            // Datos del contacto
            $table->string('name');
            $table->string('phone');
            $table->string('secondary_phone')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personnel_emergency_contacts');
    }
};
