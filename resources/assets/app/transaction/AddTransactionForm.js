import React, {Component} from 'react';
import AddTransactionFormComponent from './AddTransactionFormComponent';
import ModalMessageComponent from './../util/ModalMessageComponent';
import ModalContinueDialogComponent from './../util/ModalContinueDialogComponent';

const ACCOUNT_URL = '/accounts/details/'

export default class AddTransactionForm extends Component {
	constructor (props) {
		super(props);

		this.state = {
			isSaving: false,
			modalMessage: {
				status: undefined,
				message: undefined
			},
			modalContinue: {
				title: undefined,
				body: undefined,
				cancelButton: undefined,
				continueButton: undefined,
				redirectTo: undefined
			}
		};

		this.showContinueDialog = this.showContinueDialog.bind(this);
		this.saveTransaction = this.saveTransaction.bind(this);
	}

	showContinueDialog (modalContinue) {
		this.setState({modalContinue: modalContinue });
	};

	saveTransaction (postData) {
		if(typeof $(".snackbar").prop('tagName') !== typeof undefined)
		{
			$(".snackbar").snackbar('show');
		}
		else
		{
			$.snackbar({
				content: '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i> Saving...',
				style: 'snackbar',
				timeout: 0,
				htmlAllowed: true,
			});
		}

		postData.id = this.props.id;

		$.each(postData, function (key, value) {
			$("#fg-" + key).removeClass('has-error');
			$("#input-" + key).popover('destroy');
		});

		this.setState({isSaving: true});
		
		$.ajax({
			url: '/api/transactions/saveTransaction',
			type: 'POST',
			data: postData,
			dataType: 'json',
			success: function (response) {
				var self = this;
				this.setState({
					isSaving: false,
					modalMessage: {
						status:response.status,
						message: response.message
					}
				});

				$(".snackbar").snackbar('hide');
				$("#modalMessage").modal()
					.on('hidden.bs.modal', function () {
						window.location = ACCOUNT_URL + self.props.id + '/view-soa';
					});
			}.bind(this),
			error: function (xhr, status, error) {
				$(".snackbar").snackbar('hide');
				if(xhr.status === 422) 
				{
					$("#InvestmentMessageContainerModal").modal('hide');
					$.each(xhr.responseJSON, function (key, value) {
						$("#fg-" + key).addClass('has-error');
						$("#input-" + key).popover({trigger: 'hover', content: value, placement: 'top'});
					});
					this.setState({isSaving: false});
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
	}

	render () {
		return (
			<div className="row">
				<AddTransactionFormComponent
					showContinueDialog={this.showContinueDialog}
					saveTransaction={this.saveTransaction}
					accountId={this.props.id}
					isSaving = {this.state.isSaving}/>
				<ModalMessageComponent
					modal={this.state.modalMessage}/>
				<ModalContinueDialogComponent 
					modal={this.state.modalContinue}/>
			</div>
		);
	}
}