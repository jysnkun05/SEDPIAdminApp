import React from 'react';
import {render} from 'react-dom';
import Login from './auth/Login';
import AccountTableComponent from './account/AccountTableComponent';
import TransactionTableComponent from './account/TransactionTableComponent';
import AddAccountForm from './account/AddAccountForm'; 
import ViewAccountForm from './account/ViewAccountForm';
import EditAccountForm from './account/EditAccountForm';
import EditUserForm from './account/EditUserForm';
import AddTransactionForm from './transaction/AddTransactionForm';
import ViewTransactionForm from './transaction/ViewTransactionForm';

if(typeof $("#loginContainer").prop('tagName') !== typeof undefined)
render(<Login />, document.getElementById('loginContainer'));

if(typeof $("#accountsTableContainer").prop('tagName') !== typeof undefined)
render(<AccountTableComponent />, document.getElementById('accountsTableContainer'));

if(typeof $("#addAccountFormContainer").prop('tagName') !== typeof undefined)
render(<AddAccountForm />, document.getElementById('addAccountFormContainer'));

if(typeof $("#viewAccountContainer").prop('tagName') !== typeof undefined)
{
	var splits = window.location.href.split('/');
	var id = splits[splits.length - 2];
	console.log(id);
	render(<ViewAccountForm id={id}/>, document.getElementById('viewAccountContainer'));
}

if(typeof $("#editAccountFormContainer").prop('tagName') !== typeof undefined) {
	var splits = window.location.href.split('/');
	var id = splits[splits.length - 2];
	render(<EditAccountForm id={id} />, document.getElementById('editAccountFormContainer'));
}

if(typeof $("#editUserFormContainer").prop('tagName') !== typeof undefined) {
	var splits = window.location.href.split('/');
	var id = splits[splits.length - 2];
	render(<EditUserForm id={id} />, document.getElementById('editUserFormContainer'));
}

if(typeof $("#transactionsTableContainer").prop('tagName') !== typeof undefined)
{
	var splits = window.location.href.split('/');
	var id = splits[splits.length - 2];
	render(<TransactionTableComponent id={id}/>, document.getElementById('transactionsTableContainer'));
}

if(typeof $("#addTransactionFormContainer").prop('tagName') !== typeof undefined)
{
	var splits = window.location.href.split('/');
	var id = splits[splits.length - 2];
	render(<AddTransactionForm id={id}/>, document.getElementById('addTransactionFormContainer'));
}

if(typeof $("#viewTransactionFormContainer").prop('tagName') !== typeof undefined)
{
	var splits = window.location.href.split('/');
	var account_id = splits[splits.length - 4];
	var trans_id = splits[splits.length - 2];
	console.log(account_id);
	render(<ViewTransactionForm account_id={account_id} trans_id={trans_id} />, document.getElementById('viewTransactionFormContainer'));
}
