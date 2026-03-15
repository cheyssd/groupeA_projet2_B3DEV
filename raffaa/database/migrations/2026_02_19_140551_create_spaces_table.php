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
        Schema::create('spaces', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->decimal('surface', 6, 2); // m²
            $table->integer('capacity');

            $table->enum('type', ['bureau_prive', 'espace_partage', 'salle_reunion', 'salle_conference']);

            $table->decimal('price_per_day', 10, 2);

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spaces');
    }
};
