import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

const ACCOUNT_URL = '/accounts/details';

export default class EditAccountFormComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			name: this.props.account.name,
			type: this.props.account.type,
			email: this.props.account.email,
			is_verified: this.props.account.is_verified
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);

		this.handleNameChange = this.handleNameChange.bind(this);	
		this.handleTypeChange = this.handleTypeChange.bind(this);	
		this.handleEmailChange = this.handleEmailChange.bind(this);	
		this.handleEmailVerifiedChange = this.handleEmailVerifiedChange.bind(this);
	}

	componentDidMount () {
		$.material.init();
	}

	handleNameChange (e) {
		this.setState({name: e.target.value});
	};

	handleTypeChange (e) {
		this.setState({type: e.target.value});
	};

	handleEmailChange (e) {
		this.setState({email: e.target.value});
	};

	handleEmailVerifiedChange () {
		this.setState({is_verified: !this.state.is_verified});
	};

	handleSubmit (e) {
		e.preventDefault();
		var name = findDOMNode(this.refs.name).value.trim();
		var type = findDOMNode(this.refs.type).value.trim();
		var email = findDOMNode(this.refs.email).value.trim();

		var postData = {
			id: this.props.account.id,
			name: name,
			type: type,
			email: email,
			is_verified: this.state.is_verified
		};

		this.props.updateAccount(postData);
	};

	handleCancel () {
		var name = findDOMNode(this.refs.name).value.trim();
		var type = findDOMNode(this.refs.type).value.trim();
		var email = findDOMNode(this.refs.email).value.trim();

		if(name !== this.props.account.name || type !== this.props.account.type  || email !== this.props.account.email)
		{
			this.props.showContinueDialog({
				title: 'Discard Changes?',
				body: 'If you go back now, your entry will be discarded.',
				cancelButton: undefined,
				continueButton: 'Discard',
				redirectTo: ACCOUNT_URL + '/' + this.props.account.id + '/view-account'
			});
			$("#modalContinueDialog").modal();	
		}
		else
		{
			window.location = ACCOUNT_URL + '/' + this.props.account.id + '/view-account';
		}
	};

	render () {
		const isUpdating = this.props.isUpdating;
		return (
			<div className="col-md-8 col-md-offset-2">
				<form className="form-horizontal" onSubmit={this.handleSubmit}>
					<fieldset>
						<legend>Account Details</legend>
						<div className="form-group" id="fg-name">
							<label className="col-md-3 control-label" htmlFor="input-name">Account Name</label>
							<div className="col-md-9">
								<input type="text" className="form-control" ref="name" id="input-name" value={this.state.name} onChange={this.handleNameChange}/>
							</div>
						</div>
						<div className="form-group" id="fg-type">
							<label className="col-md-3 control-label" htmlFor="input-type">Account Type</label>
							<div className="col-md-9">
								<select className="form-control" ref="type" id="input-type" value={this.state.type} onChange={this.handleTypeChange}>
									<option value="Individual Account">Individual Account</option>
									<option value="Joint Account">Joint Account</option>
								</select>
							</div>
						</div>
						<div className="form-group" id="fg-email">
							<label className="col-md-3 control-label" htmlFor="input-email">Email Address</label>
							<div className="col-md-9">
								<input type="text" className="form-control" ref="email" id="input-email" value={this.state.email} onChange={this.handleEmailChange}/>
								<div className="checkbox">
									<label>
										<input type="checkbox" checked={this.state.is_verified} disabled={this.state.email === '' || this.state.email === null} onChange={this.handleEmailVerifiedChange}/> Set as verified email.	
									</label>
								</div>
							</div>
						</div>
						<div className="pull-right">
							<button type="button" className="btn btn-default" disabled={isUpdating} onClick={this.handleCancel}>Cancel</button>
							<button type="submit" className="btn btn-primary btn-raised" disabled={isUpdating}>Update</button>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}
}