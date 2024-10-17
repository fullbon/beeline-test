<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as DefaultModel;

abstract class Model extends DefaultModel
{
    protected $guarded = [];
}
