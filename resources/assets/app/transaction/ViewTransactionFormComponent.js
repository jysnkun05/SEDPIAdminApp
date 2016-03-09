import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

const ACCOUNT_URL = '/accounts/details/'

export default class AddTransactionFormComponent extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		const transaction = this.props.transaction;
		return (
			<div>
				<div className="col-md-10 col-md-offset-1">
					<form className="form-horizontal">
						<fieldset>
							<legend>Transaction Details</legend>
							<div className="form-group">
								<label className="col-md-3 control-label" htmlFor="input-type">Transaction Type</label>
								<div className="col-md-9">
									<p className="form-control">{transaction.transaction_type.description}</p>
								</div>
							</div>
							<div className="form-group" id="fg-date">
								<label className="col-md-3 control-label" htmlFor="input-date">Date of Transaction</label>
								<div className="col-md-9">
									<p className="form-control">{moment(transaction.date_transaction).format('DD MMM YYYY')}</p>
								</div>
							</div>
							<div className="form-group" id="fg-amount">
								<label className="col-md-3 control-label" htmlFor="input-amount">Amount</label>
								<div className="col-md-9">
									<p className="form-control">{accounting.formatMoney(transaction.amount, 'Php ')}</p>
								</div>
							</div>
							<div className="form-group" id="fg-notes">
								<label className="col-md-3 control-label" htmlFor="input-notes">Notes</label>
								<div className="col-md-9">
									<p className="form-control">{transaction.notes}</p>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		);
	}

	
}