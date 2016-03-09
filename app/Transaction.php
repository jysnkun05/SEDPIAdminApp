<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use UuidForKey;
    use SoftDeletes;
    protected $dates = ['deleted_at'];
	protected $table = 'transactions';
	protected $fillable = ['transaction_type_id', 'date_transaction', 'amount', 'notes', 'account_id'];
	public $incrementing = false;    

	public function transactionType()
	{
		return $this->belongsTo('App\TransactionType');
	}

	public function account()
	{
		return $this->belongsTo('App\Account');
	}
}
