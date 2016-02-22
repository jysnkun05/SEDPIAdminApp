<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Account;

use App\Http\Requests\AccountPostRequest;
use App\Http\Controllers\Controller;

class InvestorController extends Controller
{
    public function index ()
    {
    	return view('accounts.index');
    }

    public function getAllAccounts ()
    {
    	$accounts = Account::all();
    	return $accounts;
    }

    public function addAccount () 
    {
    	return view('accounts.add');
    }

    public function saveAccount (AccountPostRequest $request) 
    {
        $account = Account::create([
            'name'  => $request->input('name'),
            'type'  => $request->input('type'),
            'email' => $request->input('email')
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'New Account Saved.'
        ]);
    }

    public function viewDetails ($id)
    {
        $account = Account::findOrFail($id);
        return view('accounts.view');
    }

    public function getAccountDetails ($id)
    {
        $account = Account::findOrFail($id);
        return $account;
    }
}