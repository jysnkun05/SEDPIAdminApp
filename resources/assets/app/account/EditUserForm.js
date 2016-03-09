import React, {Component} from 'react';
import EditUserFormComponent from './EditUserFormComponent'; 
import ModalMessageComponent from './../util/ModalMessageComponent';
import ModalContinueDialogComponent from './../util/ModalContinueDialogComponent';

const DETAILS_URL = '/accounts/details/';

export default class EditUserForm extends Component {
	constructor (props) {
		super(props);
		this.state = {
			user: undefined,
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

		this.getInvestorUserDetails = this.getInvestorUserDetails.bind(this);
		this.showContinueDialog = this.showContinueDialog.bind(this);
		this.updateUser = this.updateUser.bind(this);

		this.getInvestorUserDetails(0);
	}

	getInvestorUserDetails (counter) {
		$.ajax({
			url: '/api/accounts/getInvestorUserDetails/' + this.props.id,
			type: 'POST',
			dataType: 'json',
			success: function (user) {
				this.setState({user: user});
			}.bind(this),
			error: function (xhr, status, error) {
				if(counter < 3) 
				{
					this.getUserDetails(counter + 1);
				}
				else
				{

				}
			}.bind(this)
		});
	};

	showContinueDialog (modalContinue) {
		this.setState({modalContinue: modalContinue });
	};

	updateUser (postData) {
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

		if((postData.name !== this.state.user.name && postData.name !== null || postData.name !== '') ||
			(postData.username !== this.state.user.username && postData.username !== '' && postData.username !== null) || 
				(postData.password !== '' && postData.password !== null) ||
					(postData.newPassword !== null && postData.newPassword !== '') ||
						(postData.is_active !== this.state.user.is_active))
		{
			postData.id = this.props.id;
			this.setState({isUpdating: true});
			$.ajax({
				url: '/api/accounts/updateUser',
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
		var component = <div className="col-md-12">
							<div className="panel panel-default">
								<div className="panel-body text-center">
									<i className="fa fa-circle-o-notch fa-spin fa-fw"></i> Loading...
								</div>
							</div>
						</div>;

		if(this.state.user !== undefined) 
		{
			component = <EditUserFormComponent 
							user={this.state.user}
							account_id={this.props.id}
							updateUser={this.updateUser}
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