import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

const ACCOUNT_URL = '/accounts';

export default class AddAccountFormComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			email: '',
			is_verified: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleEmailVerifiedChange = this.handleEmailVerifiedChange.bind(this);
	}

	handleSubmit (e) {
		e.preventDefault();
		var name = findDOMNode(this.refs.name).value.trim();
		var type = findDOMNode(this.refs.type).value.trim();
		var email = findDOMNode(this.refs.email).value.trim();
		var is_verified = this.state.is_verified;

		var postData = {
			name: name,
			type: type,
			email: email,
			is_verified: is_verified
		};

		this.props.saveAccount(postData);
	};

	handleEmailChange (e) {
		if(e.target.value === '')
			this.setState({email: e.target.value, is_verified: false});
		else 
			this.setState({email: e.target.value});
	};

	handleEmailVerifiedChange (e) {
		this.setState({is_verified: !this.state.is_verified});
	};

	handleCancel () {
		var name = findDOMNode(this.refs.name).value.trim();
		var type = findDOMNode(this.refs.type).value.trim();
		var email = findDOMNode(this.refs.email).value.trim();

		if(name !== '' || email !== '')
		{
			this.props.showContinueDialog({
				title: 'Discard Changes?',
				body: 'If you go back now, your entry will be discarded.',
				cancelButton: undefined,
				continueButton: 'Discard',
				redirectTo: ACCOUNT_URL
			});
			$("#modalContinueDialog").modal();	
		}
		else
		{
			window.location = ACCOUNT_URL;
		}
	};

	render () {
		const isSaving = this.props.isSaving;
		return (
			<div className="col-md-8 col-md-offset-2">
				<form className="form-horizontal" onSubmit={this.handleSubmit}>
					<fieldset>
						<legend>Account Details</legend>
						<div className="form-group" id="fg-name">
							<label className="col-md-3 control-label" htmlFor="input-name">Account Name *</label>
							<div className="col-md-9">
								<input type="text" className="form-control" ref="name" id="input-name"/>
								<small>This field is required.</small>
							</div>
						</div>
						<div className="form-group" id="fg-type">
							<label className="col-md-3 control-label" htmlFor="input-type">Account Type *</label>
							<div className="col-md-9">
								<select className="form-control" ref="type" id="input-type">
									<option>Individual Account</option>
									<option>Joint Account</option>
								</select>
							</div>
						</div>
						<div className="form-group" id="fg-email">
							<label className="col-md-3 control-label" htmlFor="input-email">Email Address</label>
							<div className="col-md-9">
								<input type="text" className="form-control" ref="email" id="input-email" value={this.state.email} onChange={this.handleEmailChange}/>
								<div className="checkbox">
									<label>
										<input type="checkbox" checked={this.state.is_verified} disabled={this.state.email === ''} onChange={this.handleEmailVerifiedChange}/> Set as verified email.	
									</label>
								</div>
							</div>
						</div>
						<div className="pull-right">
							<button type="button" className="btn btn-default" disabled={isSaving} onClick={this.handleCancel}>Cancel</button>
							<button type="submit" className="btn btn-primary btn-raised" disabled={isSaving}>Save</button>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}

	
}