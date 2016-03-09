import React, {Component} from 'react';

export default class TransactionTableComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {transactions: undefined};

		this.getAllTransactions = this.getAllTransactions.bind(this);
		this.retry = this.retry.bind(this);

		this.getAllTransactions(0);
	}

	retry () {
		this.setState({transactions: undefined});
		this.getAllTransactions(0);
	};

	getAllTransactions (counter) {
		$.ajax({
			url: '/api/transactions/getAllTransactions/' + this.props.id,
			type: 'POST',
			dataType: 'json',
			cache: false,
			success: function (transactions) {
				this.setState({transactions: transactions});
			}.bind(this),
			error: function (xhr, status, error) {
				if(counter <= 3)
					this.getAllTransactions(counter + 1);
				else
					this.setState({transactions: status});
			}.bind(this)
		});
	};

	render() {
		const transactions =  this.state.transactions;
		var view;
		if(transactions === undefined)
		{
			view = 	<div className="panel panel-default">
						<div className="panel-body text-center">
							<i className="fa fa-circle-o-notch fa-fw fa-spin"></i> Loading Accounts
						</div>
					</div>;
		}
		else if(transactions === 'error')
		{
			view = <div className="panel panel-default">
						<div className="panel-body text-center">
							<i className="fa fa-exclamation-triangle fa-fw"></i> Unable to load Accounts. <a href="javascript:void(0)" className="btn-xs" onClick={this.retry}>Retry</a>
						</div>
					</div>;
		}
		else if(transactions.length <= 0)
		{
			view = 	<table className="table table-striped">
						<thead>
							<tr>
								<th>Date</th>
								<th>Transaction Details</th>
								<th className="text-right">Debit</th>
								<th className="text-right">Credit</th>
								<th className="text-right">Balance</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr className="text-center"><td colSpan="6"><i className="fa fa-info-circle fa-fw"></i> No Transactions Created.</td></tr>
						</tbody>
					</table>;
		}
		else if(transactions.length > 0)
		{
			view = 	<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th>Date</th>
								<th>Transaction Details</th>
								<th className="text-right">Debit</th>
								<th className="text-right">Credit</th>
								<th className="text-right">Balance</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{transactions.map(function (transaction, index) {
								return 	<tr key={index}>
											<td>{transaction.date_transaction}</td>
											<td>{transaction.transaction_type.description}</td>
											<td className='text-right'>{!transaction.transaction_type.is_deduct ? '' : accounting.formatMoney(transaction.amount, 'Php ')}</td>
											<td className='text-right'>{transaction.transaction_type.is_deduct ? '' : accounting.formatMoney(transaction.amount, 'Php ')}</td>
											<td className="text-right">{accounting.formatMoney(transaction.running_balance, 'Php ')}</td>
											<td><a href={transaction.detail_url} className="btn-xs">View Details</a></td>
										</tr>;
							})}
						</tbody>
					</table>;
		}
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="panel panel-default">
						<div className="panel-heading">
							Statement of Account
						</div>	
						<div className="panel-body">
							<div className="row">
								<div className="col-md-12">
									{view}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}