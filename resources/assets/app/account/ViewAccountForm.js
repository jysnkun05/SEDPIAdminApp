import React, {Component} from 'react';
import ViewAccountDetailsComponent from './ViewAccountDetailsComponent';

export default class ViewAccountForm extends Component {
	constructor (props) {
		super(props);

		this.state = {
			account: undefined,
			viewMode: 'account'
		};

		this.getAccountDetails = this.getAccountDetails.bind(this);
		this.getAccountDetails(0);
	}

	getAccountDetails (counter) {
		$.ajax({
			url: '/api/accounts/getAccountDetails/' + this.props.id,
			type: 'POST',
			dataType: 'json',
			success: function (account) {
				this.setState({account: account});
			}.bind(this),
			error: function (xhr, status, error) {
				if(counter < 3)
				{
					this.getAccountDetails(counter + 1);
				}
				else
				{

				}
			}.bind(this)
		});
	};

	render () {
		const account = this.state.account;
		const viewMode = this.state.viewMode;
		var view;
		switch(viewMode) {
			case 'account':
				view = <ViewAccountDetailsComponent />;
				break;
		}
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<div className="page-header">
						<h2>{account === undefined ? ' ' : account.name}</h2>
						<small><strong>Account ID:</strong> {account === undefined ? ' ' : account.id}</small>
					</div>
					<div className="col-md-3">
						<div className="form-group">
							<ul className="nav nav-pills nav-stacked">
								<li className="active"><a href="javascript:void(0)">Account Details</a></li>
								<li><a href="javascript:void(0)">Investment Details</a></li>
							</ul>
						</div>
					</div>
					<div className="col-md-9">
						{view}
					</div>
				</div>
			</div>
		);
	}
}