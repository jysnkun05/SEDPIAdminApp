<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
	use UuidForKey;
    protected $table = 'roles';
    public $incrementing = false;
    protected $fillable = ['name'];
}
