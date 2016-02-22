import React, {Component} from 'react';

const style = {
	margin: '50px auto 20px',
	float: 'none',
	verticalAlign: 'middle'
};

const logoContainerStyle = {
	width: '250px', 
	margin: '0 auto'
};

export default class LoginFormComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			rememberMe: false
		};

		this.changeUsername = this.changeUsername.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.changeRememberMe = this.changeRememberMe.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	changeUsername(e) {
		this.setState({username: e.target.value});
	};

	changePassword(e) {
		this.setState({password: e.target.value});
	};

	changeRememberMe(e) {
		this.setState({rememberMe: !this.state.rememberMe});
	};

	handleSubmit(e) {
		e.preventDefault();
		if(this.state.username.trim() === '' || this.state.password.trim() === '') {
			this.props.changeLoginStatus('requiredError');
			return;
		}

		var postData = {
			username: this.state.username,
			password: this.state.password,
			rememberMe: this.state.rememberMe
		};

		this.props.changeLoginStatus('attempting');
		this.props.attemptLogin(postData);
	};

	render() {
		const loginStatus = this.props.loginStatus;
		return (
			<div className="col-md-3 col-sm-6 col-xs-12" style={style}>
				<div className="panel panel-default">
					<div className="panel-body">
						<div style={logoContainerStyle} className="text-center">
							<img src="/images/sedpi_logo.png" width="100%"/>
							<h5>Administrator Login</h5>
						</div>
						<form onSubmit={this.handleSubmit}>
							<div className="form-group label-floating">
								<label className="control-label" htmlFor="input-username">Username</label>
								<input 
									value={this.state.username}
									onChange={this.changeUsername}
									className="form-control" 
									id="input-username" 
									type="text"/>
							</div>
							<div className="form-group label-floating">
								<label className="control-label" htmlFor="input-password">Password</label>
								<input 
									value={this.state.password}
									onChange={this.changePassword}
									className="form-control" 
									id="input-password" 
									type="password"/>
							</div>
							<div className="checkbox">
								<label>
									<input
										value={this.state.rememberMe}
										onChange={this.changeRememberMe} 
										type="checkbox"/> Remember me
								</label>
							</div>
							<button type="submit" className="btn btn-raised btn-primary btn-block btn-lg" disabled={loginStatus === 'attempting'}>LOGIN</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}