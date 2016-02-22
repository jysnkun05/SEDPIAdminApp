import React, {Component} from 'react';

export default class ViewAccountDetailsComponent extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div className="form-group">
				<div className="panel panel-default">
					<div className="panel-heading">
						Account Details
					</div>
					<div className="panel-body">
						<div className="form-horizontal">
							<div className="form-group">
								<label className="col-md-3 control-label">Account Name</label>
								<div className="col-md-8">
									<p className="form-control">Blah blah</p>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-3 control-label">Account Type</label>
								<div className="col-md-8">
									<p className="form-control">Blah blah</p>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-3 control-label">Email Address</label>
								<div className="col-md-8">
									<p className="form-control">Blah blah</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}