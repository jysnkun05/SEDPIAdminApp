import React, {Component} from 'react';
import EditAccountFormComponent from './EditAccountFormComponent'; 
import ModalMessageComponent from './../util/ModalMessageComponent';
import ModalContinueDialogComponent from './../util/ModalContinueDialogComponent';

const DETAILS_URL = '/accounts/details/';

export default class EditAccountForm extends Component {
	constructor (props) {
		super(props);
		this.state = {
			account: undefined,
			isUpdating: false,
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

		this.getAccountDetails = this.getAccountDetails.bind(this);
		this.updateAccount = this.updateAccount.bind(this);
		this.showContinueDialog = this.showContinueDialog.bind(this);
		this.retry = this.retry.bind(this);

		this.getAccountDetails(0);
	}

	retry () {
		this.setState({account: undefined});
		this.getAccountDetails(0);	
	};

	showContinueDialog (modalContinue) {
		this.setState({modalContinue: modalContinue });
	};

	getAccountDetails (counter) {
		$.ajax({
			url: '/api/accounts/getAccountDetails/' + this.props.id,
			type: 'POST',
			dataType: 'json',
			success: function (account) {
				this.setState({account: account});
			}.bind(this),
			error: function (xhr, status, error) {
				if(counter < 5)
				{
					this.getAccountDetails(counter + 1);
				}
				else
				{
					this.setState({account: status});
				}
			}.bind(this)
		});
	};

	updateAccount (postData) {
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

		$.each(postData, function (key, value) {
			$("#fg-" + key).removeClass('has-error');
			$("#input-" + key).popover('destroy');
		});


		if(postData.name !== this.state.account.name || postData.type !== this.state.account.type || postData.email !== this.state.account.email || postData.is_verified !== this.state.account.is_verified)
		{
			this.setState({isUpdating: true});
			$.ajax({
				url: '/api/accounts/updateAccount',
				type: 'POST',
				data: postData,
				dataType: 'json',
				success: function (response) {
					var self = this;
					this.setState({
						isUpdating: false,
						modalMessage: {
							status: response.status,
							message: response.message
						}
					});

					$(".snackbar").snackbar('hide');
					$("#modalMessage").modal()
						.on('hidden.bs.modal', function () {
							window.location = DETAILS_URL + self.props.id + '/view-account';
						});
				}.bind(this),
				error: function (xhr, status, error) {
					$(".snackbar").snackbar('hide');
					if(xhr.status === 422)
					{
						$.each(xhr.responseJSON, function (key, value) {
							$("#fg-" + key).addClass('has-error');
							$("#input-" + key).popover({trigger: 'hover', content: value, placement: 'top'});
						});	
						this.setState({isUpdating: false});
					}
					else
					{
						this.setState({
							isUpdating: false,
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
		else
		{
			$(".snackbar").snackbar('hide');
			this.setState({
				modalMessage: {
					status: 'info',
					message: 'No changes has been made.'
				}
			});	
			$("#modalMessage").modal();
		}
	};

	render () {
		var component;
		if(this.state.account === undefined)
		{
			component = <div className="col-md-12">
							<div className="panel panel-default">
								<div className="panel-body text-center">
									<i className="fa fa-circle-o-notch fa-spin fa-fw"></i> Loading...
								</div>
							</div>
						</div>;

		}
		else if(this.state.account === 'error')
		{
			component = <div className="col-md-12">
							<div className="panel panel-default">
								<div className="panel-body text-center">
									<i className="fa fa-exclamation-triangle fa-fw"></i> Something's not right. <a href="javascript:void(0)" className="btn-xs" onClick={this.retry}>Retry</a> 
								</div>
							</div>
						</div>;
		}
		else if(this.state.account !== undefined) {
			component = <EditAccountFormComponent 
							account={this.state.account}
							isUpdating={this.state.isUpdating}
							updateAccount={this.updateAccount}
							showContinueDialog={this.showContinueDialog}/>;
		}

		return (
			<div className="row">
				{component}
				<ModalMessageComponent 
					modal={this.state.modalMessage}/>
				<ModalContinueDialogComponent
					modal={this.state.modalContinue}/>
			</div>
		);
	}
}