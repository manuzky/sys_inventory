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
        Schema::create('personnel_position_histories', function (Blueprint $table) {
            $table->id();

            // Relación con personal
            $table->foreignId('personnel_id')
                ->constrained('personnels')
                ->cascadeOnDelete();

            // Relación con cargo
            $table->foreignId('position_id')
                ->constrained('positions')
                ->restrictOnDelete();

            // Fechas del cargo
            $table->date('start_date');
            $table->date('end_date')->nullable();

            // Auditoría
            $table->string('assigned_by')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personnel_position_histories');
    }
};
