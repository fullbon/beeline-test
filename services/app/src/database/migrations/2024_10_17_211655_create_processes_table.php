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
        Schema::create('processes', function (Blueprint $table) {
            $table->id()->startingValue(1001);
            $table->softDeletes();
            $table->timestamps();

            $table->bigInteger('agreement_id')->comment('Договор');
            $table->foreign('agreement_id')->references('id')->on('agreements');

            // TODO: по-хорошему к подобным полям нужно делать справочники и связывать с ними, но в ТЗ такого не было
            $table->string('name')->comment('Процесс');

            $table->decimal('price', 12)->comment('Стоимость');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('processes');
    }
};
