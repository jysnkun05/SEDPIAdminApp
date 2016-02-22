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
		    Route::get('details/{id}', ['uses' => 'InvestorController@viewDetails', 'as' => 'account_details']);
		});

		Route::group(['prefix' => 'api/accounts'], function () {
			Route::post('getAllAccounts', 'InvestorController@getAllAccounts');
			Route::post('saveAccount', 'InvestorController@saveAccount');
			Route::post('getAccountDetails/{id}', 'InvestorController@getAccountDetails');
		});
	});
});
