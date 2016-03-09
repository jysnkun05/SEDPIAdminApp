<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Account;
use App\TransactionType;
use App\Transaction;

use App\Http\Requests\TransactionPostRequest;
use App\Http\Controllers\Controller;

use Carbon\Carbon;

class TransactionController extends Controller
{
    public function index () 
    {
    	return view('transactions.index');
    }

    public function getAllTransactions($id) 
    {
    	$transactions = Transaction::where('account_id', $id)
    		->orderBy('date_transaction', 'asc')
    		->get();
    	
    	foreach ($transactions as $key => $value) {
    		$value->load('transactionType');
    		$value->detail_url = route('transaction_view', ['id' => $id, 'trans_id' => $value->id]);
    	}

    	return $transactions;
    }

    public function addTransaction($id)
    {
    	$account = Account::findOrFail($id);
    	return view('transactions.add-transaction')
            ->with('account', $account);
    }

    public function getTransactionTypes () {
    	$transactionTypes = TransactionType::all();
    	return $transactionTypes;
    }


    public function saveTransaction (TransactionPostRequest $request) {
    	$transactionType = TransactionType::where('code', $request->input('type'))->firstOrFail();
    	$transaction = Transaction::create([
    		'transaction_type_id' => $transactionType->id,
			'date_transaction' => $request->input('date'),
			'amount' => $request->input('amount'),
			'notes' => $request->input('notes') === '' ? null : $request->input('notes'),
			'account_id' => $request->input('id')
    	]);

        $transaction->account->balance = $this->recomputeRunningBalance($request->input('id'));
        $transaction->account->save();

    	return response()->json([
            'status' => 'success',
            'message' => 'New Transaction Saved.'
        ]);
    }

    public function updateTransaction (TransactionPostRequest $request) 
    {
        $transactionType = TransactionType::where('code', $request->input('type'))->firstOrFail();
        $transaction = Transaction::findOrFail($request->input('id'));
        $transaction->transaction_type_id = $transactionType->id;
        $transaction->date_transaction = $request->input('date');
        $transaction->amount = $request->input('amount');
        $transaction->notes = $request->input('notes');
        $transaction->save();

        $transaction->account->balance = $this->recomputeRunningBalance($transaction->account->id);
        $transaction->account->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Transaction Updated.'
        ]);
    }

    public function deleteTransaction ($id) 
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();

        $transaction->account->balance = $this->recomputeRunningBalance($transaction->account->id);
        $transaction->account->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Transaction Deleted.'
        ]);
    }

    public function viewTransactionDetails ($id, $trans_id)
    {
    	$account = Account::findOrFail($id);
    	$transaction = Transaction::findOrFail($trans_id);
    	return view('transactions.view-transaction')
    		->with('account', $account)
    		->with('transaction', $transaction);
    }

    public function getTransactionDetails ($trans_id) {
        $transaction = Transaction::findOrFail($trans_id);
        $transaction->load('transactionType');
        return $transaction; 
    }

    protected function recomputeRunningBalance ($account_id) {
    	$transactions = Transaction::where('account_id', $account_id)
    		->orderBy('date_transaction', 'asc')
    		->get();

    	$balance = 0;

    	foreach ($transactions as $key => $value) {
    		$transactionType = TransactionType::findOrFail($value->transaction_type_id);
    		if($transactionType->is_deduct)
    			$balance -= $value->amount;
    		else
    			$balance += $value->amount;
    		
    		$value->running_balance = $balance;
    		$value->save();

        }
        
        return $balance;
    }
}
