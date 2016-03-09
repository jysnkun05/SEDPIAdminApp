<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/



/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
	Route::get('login', function () {
		return view('auth.login');
	});
	Route::post('login', ['uses' => 'Auth\AuthController@postLogin']);

	Route::group(['middleware' => 'auth'], function () {
		Route::get('/', function () {
			return redirect('accounts');
		});

		Route::group(['prefix' => 'accounts'], function () {
		    Route::get('/', ['uses' => 'InvestorController@index', 'as' => 'accounts_index']);
		    Route::get('add', ['uses' => 'InvestorController@addAccount', 'as' => 'accounts_add']);
		    
		    Route::group(['prefix' => 'details/{id}'], function () {
			    Route::get('view-account', ['uses' => 'InvestorController@viewAccountDetails', 'as' => 'view_account_details']);
			    Route::get('edit-account', ['uses' => 'InvestorController@editAccountDetails', 'as' => 'edit_account_details']);
			    Route::get('edit-user', ['uses' => 'InvestorController@editUserDetails', 'as' => 'edit_user_details']);

			    Route::get('view-investment', ['uses' => 'InvestorController@viewInvestmentDetails', 'as' => 'view_investment_details']);

			    Route::get('view-soa', ['uses' => 'InvestorController@viewSOA', 'as' => 'view_soa']);
		    });

		});

		Route::group(['prefix' => 'transactions/{id}'], function () {
	    	Route::get('add-transaction', ['uses' => 'TransactionController@addTransaction', 'as' => 'transactions_add']);
	    	Route::get('details/{trans_id}/view-transaction', ['uses' => 'TransactionController@viewTransactionDetails', 'as' => 'transaction_view']);
	    });

		Route::group(['prefix' => 'api/accounts'], function () {
			Route::post('getAllAccounts', 'InvestorController@getAllAccounts');

			Route::post('saveAccount', 'InvestorController@saveAccount');
			
			Route::post('getAccountDetails/{id}', 'InvestorController@getAccountDetails');
			Route::post('updateAccount', 'InvestorController@updateAccount');

			Route::post('getInvestorUserDetails/{id}', 'InvestorController@getInvestorUserDetails');
			Route::post('updateUser', 'InvestorController@updateUser');

			Route::post('deleteAccount/{id}', 'InvestorController@deleteAccount');
		});

		Route::group(['prefix' => 'api/transactions'], function () {
			Route::post('getAllTransactions/{id}', 'TransactionController@getAllTransactions');
			Route::post('getTransactionTypes', 'TransactionController@getTransactionTypes');
			Route::post('getTransactionDetails/{trans_id}', 'TransactionController@getTransactionDetails');
			Route::post('saveTransaction', 'TransactionController@saveTransaction');
			Route::post('updateTransaction', 'TransactionController@updateTransaction');
			Route::post('deleteTransaction/{id}', 'TransactionController@deleteTransaction');
		});
	});
});
