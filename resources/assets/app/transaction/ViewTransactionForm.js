import React, {Component} from 'react';
import ViewTransactionFormComponent from './ViewTransactionFormComponent';
import EditTransactionFormComponent from './EditTransactionFormComponent';
import ModalMessageComponent from './../util/ModalMessageComponent';
import ModalContinueDialogComponent from './../util/ModalContinueDialogComponent';

const SOA_URL = '/accounts/details/';

export default class ViewTransactionForm extends Component {
	constructor (props) {
		super(props);

		this.state = {
			transaction: undefined,
			editMode: false,
			isUpdating: false,
			modalMessage: {
				status: undefined,
				message: undefined
			}
		};

		this.getTransactionDetails = this.getTransactionDetails.bind(this);
		this.editButtonClicked = this.editButtonClicked.bind(this);
		this.updateTransaction = this.updateTransaction.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleContinueDelete = this.handleContinueDelete.bind(this);

		this.getTransactionDetails(0);
	}

	getTransactionDetails (counter) {
		$.ajax({
			url: '/api/transactions/getTransactionDetails/' + this.props.trans_id,
			type: 'POST',
			dataType: 'json',
			cache: false,
			success: function (transaction) {
				this.setState({transaction: transaction});
			}.bind(this),
			error: function (xhr, status, error) {
				if(counter >= 5)
				{
					this.setState({transaction: status});
				}
				else
				{
					this.getTransactionDetails(counter + 1);
				}
			}.bind(this)
		});
	};

	editButtonClicked () {
		this.setState({editMode: !this.state.editMode});
	};

	updateTransaction (postData) {
		if(typeof $(".snackbar").prop('tagName') !== typeof undefined)
		{
			$(".snackbar").snackbar('show');
		}
		else
		{
			$.snackbar({
				content: '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i> Updating...',
				style: 'snackbar',
				timeout: 0,
				htmlAllowed: true,
			});
		}

		postData.id = this.props.trans_id;

		$.each(postData, function (key, value) {
			$("#fg-" + key).removeClass('has-error');
			$("#input-" + key).popover('destroy');
		});

		this.setState({isUpdating: true});

		$.ajax({
			url: '/api/transactions/updateTransaction',
			type: 'POST',
			data: postData,
			dataType: 'json',
			success: function (response) {
				var self = this;
				this.setState({
					isUpdating: false,
					editMode: false,
					modalMessage: {
						status:response.status,
						message: response.message
					}
				});
				$(".snackbar").snackbar('hide');
				$("#modalMessage").modal();
				this.getTransactionDetails(0);
			}.bind(this),
			error: function (xhr, status, error) {
				$(".snackbar").snackbar('hide');
				this.setState({isUpdating: false});
				if(xhr.status === 422) 
				{
					$("#InvestmentMessageContainerModal").modal('hide');
					$.each(xhr.responseJSON, function (key, value) {
						$("#fg-" + key).addClass('has-error');
						$("#input-" + key).popover({trigger: 'hover', content: value, placement: 'top'});
					});
				}
				else
				{
					this.setState({
						isSaving: false,
						modalMessage: {
							status: status,
							message: error
						}
					});
					$("#modalMessage").modal();
				}
			}.bind(this)
		});
	};

	handleDeleteClick () {
		$("#modalDeleteDialog").modal();
	};

	handleContinueDelete () {
		if(typeof $(".snackbar").prop('tagName') !== typeof undefined)
		{
			$(".snackbar").snackbar('show');
		}
		else
		{
			$.snackbar({
				content: '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i> Deleting Transaction...',
				style: 'snackbar',
				timeout: 0,
				htmlAllowed: true,
			});
		}

		$("#modalDeleteDialog").modal('hide');

		$.ajax({
			url: '/api/transactions/deleteTransaction/' + this.props.trans_id,
			type: 'POST',
			dataType: 'json',
			success: function (response) {
				var self = this;
				$(".snackbar").snackbar('hide');
				this.setState({
					modalMessage: {
						status:response.status,
						message: response.message
					}
				});
				$("#modalMessage").modal()
					.on('hidden.bs.modal', function () {
						window.location = SOA_URL + self.props.account_id + '/view-soa'
					});
			}.bind(this),
			error: function (xhr, status, error) {
				this.setState({
					modalMessage: {
						status: status,
						message: error
					}
				});
				$("#modalMessage").modal();
			}.bind(this)
		});
	};
		

	render () {
		var view;
		const transaction = this.state.transaction;
		if(transaction === undefined)
		{
			view = 	<div className="panel panel-default">
						<div className="panel-body text-center">
							<i className="fa fa-circle-o-notch fa-fw fa-spin"></i> Loading Transaction... Please wait.
						</div>
					</div>;
		}
		else if(transaction === 'error')
		{
			view = <div className="panel panel-default">
						<div className="panel-body text-center">
							<i className="fa fa-exclamation-triangle fa-fw"></i> Something's not right. <a href="javascript:void(0)" className="btn-xs" onClick={this.retry}>Retry</a>
						</div>
					</div>;
		}
		else
		{
			view = 	<div className="row">
						{this.state.editMode ? 	<EditTransactionFormComponent
													isUpdating = {this.state.isUpdating}
													transaction={transaction}
													editButtonClicked={this.editButtonClicked}
													updateTransaction={this.updateTransaction}/> : 
												<ViewTransactionFormComponent transaction={transaction}/>}
					</div>;
		}
		return (
			<div>
				{(transaction !== undefined && transaction !== 'error') && !this.state.editMode ?
					<div className="row">
						<div className="col-md-12">
							<div className="pull-right">
								<button className="btn btn-default btn-raised btn-sm" onClick={this.editButtonClicked}>Edit</button>
								<button className="btn btn-danger btn-raised btn-sm" onClick={this.handleDeleteClick}>Delete</button>
							</div> 
						</div>
					</div> : null }
				{view}
				<div className="modal fade" id="modalDeleteDialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
	    						<button 
	    							type="button" 
	    							className="close" 
	    							data-dismiss="modal" 
	    							aria-hidden="true">×</button>
								<h4 className="modal-title">Delete Transaction?</h4>
	  						</div>
							<div className="modal-body">
	    						<p>Are you sure you want to delete this transaction?</p>
	  						</div>
	  						<div className="modal-footer">
	   							<button 
	   								type="button" 
	   								className="btn btn-default" 
	   								data-dismiss="modal">
	   									Cancel
	   							</button>
	   							<button 
	   								type="button" 
	   								className="btn btn-danger btn-raised" 
	   								onClick={this.handleContinueDelete}>
	   									Delete
	   							</button>
	 						</div>
						</div>
					</div>
			  	</div>
				<ModalMessageComponent
					modal={this.state.modalMessage}/>	
			</div>
		);
	}
}