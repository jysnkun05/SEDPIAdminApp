@extends('layouts.master')
@section('title', 'Accounts')
@section('content')
@include('layouts.nav')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-10 col-md-offset-1">
			<div class="panel panel-default">
				<div class="panel-body">
					<div class="page-header">
						<h2>Investor Accounts <a href="{{route('accounts_add')}}" class="btn btn-raised btn-primary btn-sm">Add Account</a></h2>
					</div>
					<div class="row">
						<div class="col-md-12">
							<ul class="breadcrumb">
							  	<li class="active">Investor</li>
							</ul>
						</div>
					</div>
					<div id="accountsTableContainer"></div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection