<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvestorUser extends Model
{
	use UuidForKey;
	use SoftDeletes;
	protected $dates = ['deleted_at'];
    protected $table = 'investor_users';
    public $incrementing = false;
    public $fillable = ['name', 'email', 'account_id'];

    public function account() {
    	return $this->belongsTo('App\Account');
    }
}
