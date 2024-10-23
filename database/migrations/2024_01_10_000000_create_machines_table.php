<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('machines', function (Blueprint $table) {
            $table->id();
            $table->string('serial_number')->unique();
            $table->string('tracker_serial_number');
            $table->enum('project_stock_type', ['Project', 'Stock']);
            $table->string('project_stock_value');
            $table->string('version');
            $table->string('status');
            $table->date('date_left')->nullable();
            $table->date('date_return')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('machines');
    }
};