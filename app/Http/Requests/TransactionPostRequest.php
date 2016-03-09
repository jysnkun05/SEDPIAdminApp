<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use App\TransactionType;
use App\Transaction;

class TransactionPostRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $transactionType = TransactionType::where('code', Request::get('type'))->firstOrFail();
        $transaction = Transaction::where('account_id', Request::get('id'))->orderBy('date_transaction', 'asc')->first(['running_balance']);
        $transaction = $transaction == '' ? 0 : $transaction;  
        if($transactionType->is_deduct)
        {
            return [
                'type' => 'required',
                'date' => 'required|date',
                'amount' => 'required|numeric|min:1|max:'.$transaction
            ];
        }
        else
        {
            return [
                'type' => 'required',
                'date' => 'required|date',
                'amount' => 'required|numeric|min:1'
            ];
        }
    }
}
