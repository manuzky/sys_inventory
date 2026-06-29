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

            /*
            |--------------------------------------------------------------------------
            | Datos personales
            |--------------------------------------------------------------------------
            */

            $table->string('first_name');
            $table->string('last_name');

            // Documento
            $table->enum('document_type', ['V', 'E']);
            $table->string('id_number')->unique();

            // Fecha de nacimiento
            $table->date('birth_date');

            // Sexo
            $table->enum('gender', [
                'male',
                'female',
            ]);

            // Estado civil
            $table->enum('marital_status', [
                'single',
                'married',
                'divorced',
                'widowed',
            ]);

            /*
            |--------------------------------------------------------------------------
            | Contacto
            |--------------------------------------------------------------------------
            */

            // Correo
            $table->string('email')->unique();

            // Teléfono principal
            $table->string('phone')->nullable();

            // Segundo teléfono
            $table->string('secondary_phone')->nullable();

            // Dirección
            $table->text('address')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Información laboral
            |--------------------------------------------------------------------------
            */

            // Fecha de ingreso
            $table->date('hire_date');

            // Estado
            $table->string('status')->default('active');

            /*
            |--------------------------------------------------------------------------
            | Archivos
            |--------------------------------------------------------------------------
            */

            // Foto
            $table->text('photo')->nullable();

            // Curriculum PDF
            $table->text('curriculum')->nullable();

            $table->timestamps();
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