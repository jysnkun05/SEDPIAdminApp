<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TransactionType extends Model
{
	use UuidForKey;
	use SoftDeletes;
	protected $dates = ['deleted_at'];
	protected $table = 'transaction_types';
	protected $fillable = ['code', 'description', 'is_deduct'];
	public $incrementing = false;    

	public function transactions()
	{
		return $this->hasMany('App\Transaction');
	}
}
