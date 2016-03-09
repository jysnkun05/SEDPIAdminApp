@extends('layouts.master')
@section('title', 'Add New Transaction')
@section('content')
@include('layouts.nav')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-body">
					<div class="page-header">
						<h2>Add New Transaction</h2>
						<small><strong>{{$account->name}}</strong> ({{$account->id}})</small>
					</div>
					<div class="row">
						<div class="col-md-12">
							<ul class="breadcrumb">
							  	<li class="active"><a href="{{route('accounts_index')}}">Investor</a></li>
							  	<li class="active"><a href="{{route('view_soa', ['id' => $account->id])}}">View Statement of Account</a></li>
							  	<li class="active">Add New Transaction</li>
							</ul>
						</div>
					</div>
					<div id="addTransactionFormContainer"></div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection