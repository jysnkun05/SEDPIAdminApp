import React, {Component} from 'react';

const alertDanger = "alert alert-dismissible alert-danger";
const alertSuccess = "alert alert-dismissible alert-success";
const alertInfo = "alert alert-dismissible alert-info";

export default class ModalMessageComponent extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		const modal = this.props.modal;
		var modalContent;
		var alertClass;
		if(modal !== undefined)
		{
			switch(modal.status) {
				case 'success':
					alertClass = alertSuccess;
					break;
				case 'error':
					alertClass = alertDanger;
					break;
				case 'info':
					alertClass = alertInfo;
					break;
			}		

			modalContent = <div className={alertClass}>
								<button type="button" className="close" data-dismiss="modal">×</button>
							  	{modal.message}
							</div>;
		}

		return (
			<div className="modal fade" id="modalMessage">
				<div className="modal-dialog">
					{modalContent}
			  	</div>
			</div>
		);
	}
}