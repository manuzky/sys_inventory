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
        Schema::create('personnels', function (Blueprint $table) {
            $table->id();

            // Identificación
            $table->string('first_name');
            $table->string('last_name');

            $table->string('idNumber')->unique();
            $table->string('email')->unique();

            // Información personal
            $table->date('birth_date');
            $table->string('gender', 10)->nullable();

            // Contacto (opcionales)
            $table->string('phone')->nullable();
            $table->string('address')->nullable();

            // Laboral
            $table->string('status')->default('active');
            $table->date('hire_date')->nullable();

            // Extras
            $table->text('photo')->nullable();

            // Auditoría (por ahora simple)
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personnels');
    }
};
