@extends('layouts.master')
@section('title', 'Add Account')
@section('content')
@include('layouts.nav')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-body">
					<div class="page-header">
						<h2>Add Account</h2>
					</div>
					<div id="addAccountFormContainer"></div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection