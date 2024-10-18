<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Agreement extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'region',
        'branch',
        'status',
        'started_at',
        'finished_at',
        'comment',
    ];

    protected array $dates = [
        'started_at',
        'finished_at',
        'deleted_at',
    ];

    protected $casts = [
        'started_at' => 'date:d.m.Y',
        'finished_at' => 'date:d.m.Y',
    ];

    public function processes(): HasMany
    {
        return $this->hasMany(Process::class);
    }

    // Мутатор для поля started_at
    public function setStartedAtAttribute($value)
    {
        $this->attributes['started_at'] = Carbon::createFromFormat('d.m.Y', $value)->format('Y-m-d');
    }

    // Мутатор для поля finished_at
    public function setFinishedAtAttribute($value)
    {
        $this->attributes['finished_at'] = Carbon::createFromFormat('d.m.Y', $value)->format('Y-m-d');
    }
}
