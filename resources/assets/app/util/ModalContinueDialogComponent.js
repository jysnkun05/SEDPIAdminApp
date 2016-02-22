import React, {Component} from 'react';

export default class ModalContinueDialogComponent extends Component {
	constructor(props) {
		super(props);

		this.handleContinue = this.handleContinue.bind(this);
	}

	handleContinue () {
		$("#modalContinueDialog").modal('hide');
		if(this.props.modal.redirectTo === null)
			return;
		else
			window.location = this.props.modal.redirectTo;
	};

	render () {
		const modal = this.props.modal;
		var modalContent;
		if(modal !== undefined)
		{
			modalContent = 	<div className="modal-content">
		  						<div className="modal-header">
		    						<button 
		    							type="button" 
		    							className="close" 
		    							data-dismiss="modal" 
		    							aria-hidden="true">×</button>
		    							<h4 className="modal-title">{modal.title}</h4>
		  						</div>
		  						<div className="modal-body">
		    						<p>{modal.body}</p>
		  						</div>
		  						<div className="modal-footer">
		   							<button 
		   								type="button" 
		   								className="btn btn-default" 
		   								data-dismiss="modal">
		   									{modal.cancelButton === undefined ? "Cancel" : modal.cancelButton}
		   							</button>
		   							<button 
		   								type="button" 
		   								className="btn btn-primary btn-raised" 
		   								onClick={this.handleContinue}>
		   									{modal.continueButton === undefined ? "Continue" : modal.continueButton}
		   							</button>
		 						</div>
							</div>;
		}
		return (
			<div className="modal fade" id="modalContinueDialog">
				<div className="modal-dialog">
					{modalContent}
				</div>
		  	</div>
		);
	}
}