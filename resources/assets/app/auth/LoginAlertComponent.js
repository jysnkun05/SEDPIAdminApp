import React, {Component} from 'react';

const hiddenStyle = {
	margin: '50px auto 20px',
	float: 'none', 
	verticalAlign: 'middle',
	visibility: 'hidden'
};

const visibleStyle = {
	margin: '50px auto 20px',
	float: 'none', 
	verticalAlign: 'middle',
};

export default class LoginAlertComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const loginStatus = this.props.loginStatus;
		var alertContainer; 
		switch (loginStatus) {
			case 'attempting':
				alertContainer = 	<div className="alert alert-info">
										Logging In...
									</div>;
				break;
			case 'requiredError':
				alertContainer = 	<div className="alert alert-danger">
										Username/Password is required.
									</div>;
				break;
		}
		return (
			<div className="col-md-3 col-sm-6 col-xs-12" style={loginStatus === undefined ? hiddenStyle : visibleStyle}>
				{alertContainer}
			</div>
		);
	}
}