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
        Schema::create('space_images', function (Blueprint $table) {
            $table->id();

            $table->foreignId('space_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('filename');
            $table->string('alt_text');
            $table->integer('position')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('space_images');
    }
};
