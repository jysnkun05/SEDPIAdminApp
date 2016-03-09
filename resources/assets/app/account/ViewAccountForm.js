import React, {Component} from 'react';
import ModalMessageComponent from './../util/ModalMessageComponent';
import ModalContinueDialogComponent from './../util/ModalContinueDialogComponent';

const DETAILS_URL = '/accounts/details/';
const ACCOUNT_URL = '/accounts';

export default class ViewAccountForm extends Component {
	constructor (props) {
		super(props);

		this.state = {
			modalMessage: {
				status: undefined,
				message: undefined
			}
		};
		
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleContinueDelete = this.handleContinueDelete.bind(this);	
	}

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
				content: '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i> Deleting Account...',
				style: 'snackbar',
				timeout: 0,
				htmlAllowed: true,
			});
		}

		$("#modalDeleteDialog").modal('hide');

		$.ajax({
			url: '/api/accounts/deleteAccount/' + this.props.id,
			type: 'POST',
			dataType: 'json',
			success: function (response) {
				$(".snackbar").snackbar('hide');
				this.setState({
					modalMessage: {
						status:response.status,
						message: response.message
					}
				});
				$("#modalMessage").modal()
					.on('hidden.bs.modal', function () {
						window.location = ACCOUNT_URL;
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
		return (
			<div>
				<div className="panel panel-default">
					<div className="panel-heading">
						Other Options
					</div>
					<div className="panel-body">
						<div className="row">
							<div className="col-md-12">
								<button className="btn btn-danger btn-raised" onClick={this.handleDeleteClick}>Delete this account</button>
							</div>
						</div>
					</div>
				</div>
				<div className="modal fade" id="modalDeleteDialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
	    						<button 
	    							type="button" 
	    							className="close" 
	    							data-dismiss="modal" 
	    							aria-hidden="true">×</button>
								<h4 className="modal-title">Delete Account?</h4>
	  						</div>
							<div className="modal-body">
	    						<p>Are you sure you want to delete this account?</p>
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