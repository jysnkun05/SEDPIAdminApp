import React, {Component} from 'react';

export default class AccountTableComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {accounts: undefined};

		this.getAllAccounts = this.getAllAccounts.bind(this);
		this.retry = this.retry.bind(this);

		this.getAllAccounts(0);
	}

	componentDidMount () {
		this.timer = setInterval(this.retry, 100000);
	}

	retry () {
		this.setState({accounts: undefined});
		this.getAllAccounts(0);
	};

	getAllAccounts(counter) {
		$.ajax({
			url: '/api/accounts/getAllAccounts',
			type: 'POST',
			dataType: 'json',
			cache: false,
			success: function (accounts) {
				this.setState({accounts: accounts});
			}.bind(this),
			error: function (xhr, status, error) {
				if(counter <= 3)
					this.getAllAccounts(counter + 1);
				else
					this.setState({accounts: status});
			}.bind(this)
		});
	};

	render () {
		const accounts = this.state.accounts;
		var view;
		if(accounts === undefined)
		{
			view = 	<div className="panel panel-default">
						<div className="panel-body text-center">
							<i className="fa fa-circle-o-notch fa-fw fa-spin"></i> Loading Accounts
						</div>
					</div>;
		}
		else if(accounts === 'error')
		{
			view = <div className="panel panel-default">
						<div className="panel-body text-center">
							<i className="fa fa-exclamation-triangle fa-fw"></i> Unable to load Accounts. <a href="javascript:void(0)" className="btn-xs" onClick={this.retry}>Retry</a>
						</div>
					</div>;
		}
		else if(accounts.length <= 0)
		{
			view = 	<table className="table table-striped">
						<thead>
							<tr>
								<th>#</th>
								<th>Account Name</th>
								<th>Account Type</th>
								<th>Balance</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr className="text-center"><td colSpan="5"><i className="fa fa-info-circle fa-fw"></i> No Accounts Created.</td></tr>
						</tbody>
					</table>;
		}
		else if(accounts.length > 0)
		{
			view = 	<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th>#</th>
								<th>Account Name</th>
								<th>Account Type</th>
								<th className="text-right">Balance</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{accounts.map(function (account, index) {
								return 	<tr key={index}>
											<td>{index + 1}</td>
											<td>{account.name}</td>
											<td>{account.type}</td>
											<td className="text-right">{accounting.formatMoney(account.balance, 'Php ')}</td>
											<td>
												<a href={"/accounts/details/" + account.id + "/view-account"} className="btn-xs">View Details</a>
												<a href={"/accounts/details/" + account.id + "/view-soa"} className="btn-xs">View Statement of Account</a> 
											</td>
										</tr>;
							})}
						</tbody>
					</table>;
		}
		return (
			<div className="row">
				<div className="col-md-12">
					{view}
				</div>
			</div>
		);
	}
}