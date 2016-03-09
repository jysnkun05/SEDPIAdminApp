<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Account;
use App\InvestorUser;
use Carbon\Carbon;

use App\Http\Requests\AccountPostRequest;
use App\Http\Requests\InvestorUserPostRequest;
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
            'email' => $request->input('email') === '' ? null : $request->input('email')
        ]);

        if($request->input('is_verified') == 'true')
        {
            $account->is_verified = true;
            $account->save();
        }

        $user = InvestorUser::create([
            'name' => $account->name,
            'email'  => $request->input('email') === '' ? null : $request->input('email'),
            'account_id' => $account->id
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'New Account Saved.'
        ]);
    }

    public function viewAccountDetails($id)
    {
        $account = Account::findOrFail($id);
        $account->load('investorUser');

        if($account->investorUser->password_changed_at !== null)
        // $account->investorUser->password_changed_at = Carbon::now()->diffForHumans(Carbon::parse($account->investorUser->password_changed_at));
        $account->investorUser->password_changed_at = Carbon::parse($account->investorUser->password_changed_at)->format('d M Y g:i:s a');
        
        return view('accounts.view-account')
            ->with('account', $account);
    }

    public function editAccountDetails ($id)
    {
        $account = Account::findOrFail($id);
        return view('accounts.edit-account')
            ->with('account', $account);
    }

    public function getAccountDetails ($id)
    {
        $account = Account::findOrFail($id);
        return $account;
    }

    public function updateAccount (AccountPostRequest $request)
    {
        $account = Account::findOrFail($request->input('id'));
        if($account->name !== $request->input('name') && $request->input('name') !== '' && $request->input('name') !== null)
            $account->name = $request->input('name');
        if($account->type !== $request->input('type') && $request->input('type') !== '' && $request->input('type') !== null)
            $account->type = $request->input('type');
        if($account->email !== $request->input('email') && $request->input('email') !== '' && $request->input('email') !== null)
            $account->email = $request->input('email');
        
        if($request->input('is_verified') == 'true')
            $account->is_verified = true;
        else
            $account->is_verified = false;

        $account->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Account Updated.'
        ]);
    }

    public function editUserDetails($id) 
    {
        $account = Account::findOrFail($id);
        $investorUser = $account->load('investorUser');
        return view('accounts.edit-user')
            ->with('investorUser', $investorUser);
    }

    public function getInvestorUserDetails ($id) 
    {
        $account = Account::findOrFail($id);
        $account->load('investorUser');
        return $account->investorUser;
    }

    public function updateUser (InvestorUserPostRequest $request)
    {
        $account = Account::findOrFail($request->input('id'));
        $account->load('investorUser');
        
        if($account->investorUser->name !== $request->input('name') && $request->input('name') !== '' && $request->input('name') !== null)
            $account->investorUser->name = $request->input('name');
        
        if($account->investorUser->username !== $request->input('username') && $request->input('name') !== '' && $request->input('username') !== null)
            $account->investorUser->username = $request->input('username');
        
        if($request->input('newPassword') !== '' && $request->input('newPassword') !== null)
        {
            $account->investorUser->password = bcrypt($request->input('newPassword'));
            $account->investorUser->password_changed_at = Carbon::now();
        }

        $account->investorUser->is_active = $request->input('is_active') === 'true' ? true : false;
        $account->investorUser->save();

        return response()->json([
            'status' => 'success',
            'message' => 'User Updated.'
        ]);
    }

    public function viewInvestmentDetails ($id) {
        $account = Account::findOrFail($id);
        return view('accounts.view-investment')
            ->with('account', $account);
    }

    public function viewSOA ($id) {
        $account = Account::findOrFail($id);
        return view('accounts.view-soa')
            ->with('account', $account);
    }

    public function deleteAccount ($id)
    {
        $account = Account::findOrFail($id);
        $account->load('transactions');
        foreach($account->transactions as $key => $value) {
            $value->delete();
        }

        $account->load('investorUser');
        $account->investorUser->delete();

        $account->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Account Deleted.'
        ]);
    }
}