import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

const ACCOUNT_URL = '/accounts/details';

export default class EditAccountFormComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			name: this.props.user.name,
			username: this.props.user.username,
			password_changed_at: this.props.user.password_changed_at,
			newPassword: '',
			repeatNewPassword: '',
			is_active: this.props.user.is_active == 1 ? true : false
		};

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
		this.handleRepeatNewPasswordChange = this.handleRepeatNewPasswordChange.bind(this);
		this.handleIsActiveChange = this.handleIsActiveChange.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	componentDidMount() {
		$.material.init();
	}

	handleNameChange (e) {
		this.setState({name: e.target.value});
	};

	handleUsernameChange (e) {
		this.setState({username: e.target.value});
	};

	handleNewPasswordChange (e) {
		this.setState({newPassword: e.target.value});
	};

	handleRepeatNewPasswordChange (e) {
		this.setState({repeatNewPassword: e.target.value});
	};

	handleIsActiveChange (e) {
		this.setState({is_active: !this.state.is_active});
	};

	handleCancel () {
		var name = findDOMNode(this.refs.name).value.trim();
		var username = findDOMNode(this.refs.username).value.trim();
		var newPassword = findDOMNode(this.refs.newPassword).value;
		var repeatNewPassword = findDOMNode(this.refs.repeatNewPassword).value;
		var is_active = findDOMNode(this.refs.is_active).value;

		if(name !== this.props.user.name || username !== this.props.user.username || newPassword !== '' || is_active !== this.props.user.is_active)
		{
			this.props.showContinueDialog({
				title: 'Discard Changes?',
				body: 'If you go back now, your entry will be discarded.',
				cancelButton: undefined,
				continueButton: 'Discard',
				redirectTo: ACCOUNT_URL + '/' + this.props.account_id + '/view-account'
			});
			$("#modalContinueDialog").modal();	
		}
		else
		{
			window.location = ACCOUNT_URL + '/' + this.props.account_id + '/view-account';
		}
	};

	handleSubmit (e) {
		e.preventDefault();
		var name = findDOMNode(this.refs.name).value.trim();
		var username = findDOMNode(this.refs.username).value.trim();
		var newPassword = findDOMNode(this.refs.newPassword).value;
		var repeatNewPassword = findDOMNode(this.refs.repeatNewPassword).value;
		var is_active = this.state.is_active;

		var postData = {
			name: name,
			username: username,
			newPassword: newPassword,
			repeatNewPassword: repeatNewPassword,
			is_active: is_active
		};

		this.props.updateUser(postData);
	};

	render () {
		const isUpdating = this.props.isUpdating;
		return (
			<div className="col-md-8 col-md-offset-2">
				<h3>User Details</h3>
				<form className="form-horizontal" onSubmit={this.handleSubmit}>
					<fieldset>
						<div className="form-group" id="fg-name">
							<label className="col-md-4 control-label" htmlFor="input-name">Display Name</label>
							<div className="col-md-8">
								<input type="text" className="form-control" ref="name" id="input-name" value={this.state.name} onChange={this.handleNameChange}/>
							</div>
						</div>
						<div className="form-group" id="fg-username">
							<label className="col-md-4 control-label" htmlFor="input-username">Username</label>
							<div className="col-md-8">
								<input type="text" className="form-control" ref="username" id="input-username" value={this.state.username} placeholder="Enter Username" onChange={this.handleUsernameChange}/>
							</div>
						</div>
						<div className="form-group" id="fg-newPassword">
							<label className="col-md-4 control-label" htmlFor="input-newPassword">New Password</label>
							<div className="col-md-8">
								<input type="password" className="form-control" ref="newPassword" id="input-newPassword" placeholder="Enter new password" onChange={this.handleNewPasswordChange}/>
							</div>
						</div>
						<div className="form-group" id="fg-repeatNewPassword">
							<label className="col-md-4 control-label" htmlFor="input-repeatNewPassword">Repeat New Password</label>
							<div className="col-md-8">
								<input type="password" className="form-control" ref="repeatNewPassword" id="input-repeatNewPassword" placeholder="Re-enter new password" onChange={this.handleRepeatNewPasswordChange}/>
							</div>
						</div>	
						<div className="form-group">
							<div className="col-md-8 col-md-offset-4 togglebutton">
								<label>
								    <input type="checkbox" checked={this.state.is_active} ref="is_active" onChange={this.handleIsActiveChange}/> Set as Active
							    </label>
							</div>
						</div>	
						<div className="pull-right">
							<button type="button" className="btn btn-default" disabled={isUpdating} onClick={this.handleCancel}>Cancel</button>
							<button type="submit" className="btn btn-primary btn-raised" disabled={isUpdating}>Save Changes</button>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}

}