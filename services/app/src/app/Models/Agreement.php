<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Agreement extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'region',
        'branch',
        'started_at',
        'finished_at',
        'comment',
    ];

    protected array $dates = [
        'started_at',
        'finished_at',
        'deleted_at',
    ];

    public function processes(): HasMany
    {
        return $this->hasMany(Process::class);
    }
}
