import React, {Component} from 'react';
import AddAccountFormComponent from './AddAccountFormComponent'; 
import ModalMessageComponent from './../util/ModalMessageComponent';
import ModalContinueDialogComponent from './../util/ModalContinueDialogComponent';

const ACCOUNT_URL = '/accounts';

export default class AddAccountForm extends Component {
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

		this.saveAccount = this.saveAccount.bind(this);
		this.showContinueDialog = this.showContinueDialog.bind(this);
	}

	showContinueDialog (modalContinue) {
		this.setState({modalContinue: modalContinue });
	};

	saveAccount (postData) {
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

		$.each(postData, function (key, value) {
			$("#fg-" + key).removeClass('has-error');
			$("#input-" + key).popover('destroy');
		});

		this.setState({isSaving: true});
		$.ajax({
			url: '/api/accounts/saveAccount',
			type: 'POST',
			data: postData,
			dataType: 'json',
			success: function (response) {
				this.setState({
					isSaving: false,
					modalMessage: {
						status: response.status,
						message: response.message
					}
				});

				$(".snackbar").snackbar('hide');
				$("#modalMessage").modal()
					.on('hidden.bs.modal', function () {
						window.location = ACCOUNT_URL;
					});
			}.bind(this),
			error: function (xhr, status, error) {
				$(".snackbar").snackbar('hide');
				if(xhr.status === 422)
				{
					$("#InvestMessageContainerModal").modal('hide');
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
	};

	render () {
		return (
			<div className="row">
				<AddAccountFormComponent 
					isSaving={this.state.isSaving}
					saveAccount={this.saveAccount}
					showContinueDialog={this.showContinueDialog}/>
				<ModalMessageComponent 
					modal={this.state.modalMessage}/>
				<ModalContinueDialogComponent
					modal={this.state.modalContinue}/>
			</div>
		);
	}

	
}