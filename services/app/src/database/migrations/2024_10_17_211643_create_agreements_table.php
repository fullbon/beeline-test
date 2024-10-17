<?php

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use SoftDeletes;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('agreements', function (Blueprint $table) {
            $table->id()->startingValue(1001);
            $table->softDeletes();
            $table->timestamps();

            // TODO: по-хорошему к подобным полям нужно делать справочники и связывать с ними, но в ТЗ такого не было
            $table->string('region')->comment('Регион');
            $table->string('branch')->comment('Филиал');

            $table->dateTime('started_at')->comment('Дата начала');
            $table->dateTime('finished_at')->comment('Дата окончания');

            $table->string('comment')->nullable()->comment('Комментарий');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agreements');
    }
};
