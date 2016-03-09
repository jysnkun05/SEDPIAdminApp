import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

const ACCOUNT_URL = '/accounts/details/'

export default class AddTransactionFormComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			types: undefined,
			amount: accounting.formatMoney(0, 'Php ')
		};

		this.getTransactionTypes = this.getTransactionTypes.bind(this);

		this.amountChanged = this.amountChanged.bind(this);
		this.amountFocused = this.amountFocused.bind(this);
		this.amountBlurred = this.amountBlurred.bind(this);

		this.handleCancel = this.handleCancel.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.getTransactionTypes(0);
	}

	componentDidMount () {
		$('#input-date').bootstrapMaterialDatePicker({
			time: false,
			format: 'DD MMMM YYYY'
		});

	}

	getTransactionTypes (counter) {
		$.ajax({
			url: '/api/transactions/getTransactionTypes',
			type: 'POST',
			dataType: 'json',
			cache: false,
			success: function (types) {
				this.setState({types: types});
			}.bind(this),
			error: function (xhr, status, error) {
				if(counter <= 3)
					this.getTransactionTypes(counter + 1);
				else
					this.setState({types: status});
			}.bind(this)
		});
	};

	amountChanged (e) {
		this.setState({amount: e.target.value});
	}

	amountFocused () {
		this.setState({amount: accounting.unformat(this.state.amount)});
	}

	amountBlurred () {
		this.setState({amount: accounting.formatMoney(this.state.amount, 'Php ')});
	}

	handleCancel () {
		this.props.showContinueDialog({
			title: 'Discard Changes?',
			body: 'If you go back now, your entry will be discarded.',
			cancelButton: undefined,
			continueButton: 'Discard',
			redirectTo: ACCOUNT_URL + this.props.accountId + '/view-soa'
		});
		$("#modalContinueDialog").modal();
	}

	handleSubmit (e) {
		e.preventDefault();
		var type  = findDOMNode(this.refs.type).value;
		var date = moment(findDOMNode(this.refs.date).value).format('YYYY-MM-DD');
		var amount = accounting.unformat(findDOMNode(this.refs.amount).value);
		var notes = findDOMNode(this.refs.notes).value;

		var postData = {
			type: type,
			date: date,
			amount: amount,
			notes: notes
		};

		this.props.saveTransaction(postData);
	}

	render () {
		const types = this.state.types;
		const isSaving = this.props.isSaving;
		var typeOptions;
		if(types === undefined)
		{
			typeOptions = <option>Loading... Please wait.</option>;
		}
		else if (types.length > 0)
		{
			typeOptions = types.map(function (type, index) {
				return <option key={index} value={type.code}>{type.description}</option>
			});
		}
		return (
			<div className="col-md-8 col-md-offset-2">
				<form className="form-horizontal" onSubmit={this.handleSubmit}>
					<fieldset>
						<legend>Transaction Details</legend>
						<div className="form-group" id="fg-type">
							<label className="col-md-3 control-label" htmlFor="input-type">Transaction Type</label>
							<div className="col-md-9">
								<select className="form-control" ref="type" id="input-type" disabled={types === undefined}>
									{typeOptions}
								</select>
							</div>
						</div>
						<div className="form-group" id="fg-date">
							<label className="col-md-3 control-label" htmlFor="input-date">Date of Transaction</label>
							<div className="col-md-9">
								<input type="text" className="form-control" ref="date" id="input-date"/>
							</div>
						</div>
						<div className="form-group" id="fg-amount">
							<label className="col-md-3 control-label" htmlFor="input-amount">Amount</label>
							<div className="col-md-9">
								<input type="text" className="form-control" ref="amount" id="input-amount" value={this.state.amount} onChange={this.amountChanged} onBlur={this.amountBlurred} onFocus={this.amountFocused}/>
							</div>
						</div>
						<div className="form-group" id="fg-notes">
							<label className="col-md-3 control-label" htmlFor="input-notes">Notes</label>
							<div className="col-md-9">
								<textarea className="form-control" ref="notes" id="input-notes"/>
							</div>
						</div>
						<div className="form-group">
							<div className="pull-right">
								<button type="button" className="btn btn-default" disabled={isSaving} onClick={this.handleCancel}>Cancel</button>
								<button type="submit" className="btn btn-raised btn-primary" disabled={isSaving}>Save</button>
							</div>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}
}