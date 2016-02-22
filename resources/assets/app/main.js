import React from 'react';
import {render} from 'react-dom';
import Login from './auth/Login';
import AccountTableComponent from './account/AccountTableComponent';
import AddAccountForm from './account/AddAccountForm'; 
import ViewAccountForm from './account/ViewAccountForm';

if(typeof $("#loginContainer").prop('tagName') !== typeof undefined)
render(<Login />, document.getElementById('loginContainer'));

if(typeof $("#accountsTableContainer").prop('tagName') !== typeof undefined)
render(<AccountTableComponent />, document.getElementById('accountsTableContainer'));

if(typeof $("#addAccountFormContainer").prop('tagName') !== typeof undefined)
render(<AddAccountForm />, document.getElementById('addAccountFormContainer'));

if(typeof $("#viewAccountFormContainer").prop('tagName') !== typeof undefined)
{
	var splits = window.location.href.split('/');
	var id = splits[splits.length - 1];
	render(<ViewAccountForm id={id}/>, document.getElementById('viewAccountFormContainer'));
}


