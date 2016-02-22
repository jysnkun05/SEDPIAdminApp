import React, {Component} from 'react';
import LoginFormComponent from './LoginFormComponent';
import LoginAlertComponent from './LoginAlertComponent';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginStatus: undefined
		};

		this.changeLoginStatus = this.changeLoginStatus.bind(this);
		this.attemptLogin = this.attemptLogin.bind(this);
	}

	changeLoginStatus (status) {
		this.setState({loginStatus: status});
	};

	attemptLogin(postData) {
		console.log(postData);
		$.ajax({
			url: '/api/auth/login',
			type: 'POST',
			dataType: 'json',
			data: postData,
			success: function (response) {
				window.location.replace(response.redirectIntendedTo);
			}.bind(this),
			error: function (xhr, status, error) {
				console.log('somethings\'s not right');
			}.bind(this)
		});
	};

	render() {
		const loginStatus = this.state.loginStatus;
		return (	
			<div>
				<LoginAlertComponent loginStatus={loginStatus}/>
				<LoginFormComponent
					loginStatus={loginStatus} 
					changeLoginStatus={this.changeLoginStatus}
					attemptLogin={this.attemptLogin}/>
			</div>
		);
	}
}