@extends('layouts.master')
@section('title', 'Edit Account')
@section('content')
@include('layouts.nav')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-body">
					<div class="page-header">
						<h2>Edit Account</h2>
					</div>
					<div class="row">
						<div class="col-md-12">
							<ul class="breadcrumb">
							  	<li class="active"><a href="{{route('accounts_index')}}">Investor</a></li>
							  	<li class="active">Edit Account</li>
							</ul>
						</div>
					</div>
					<div id="editAccountFormContainer"></div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection