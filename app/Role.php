<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
	use UuidForKey;
	use SoftDeletes;
    protected $table = 'roles';
    protected $dates = ['deleted_at'];
    public $incrementing = false;
    protected $fillable = ['name'];
}
