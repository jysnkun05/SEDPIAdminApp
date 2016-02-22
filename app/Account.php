<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
	use UuidForKey;
    protected $table = 'accounts';

    public $incrementing = false;

    protected $fillable = ['name', 'type', 'email'];
}
