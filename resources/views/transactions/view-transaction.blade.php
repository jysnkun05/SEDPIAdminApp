@extends('layouts.master')
@section('title', 'View Transaction Details')
@section('content')
@include('layouts.nav')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-body">
					<div class="pull-left">
						<a href="{{route('view_soa', ['id' => $account->id])}}"><i class="fa fa-chevron-left fa-fw"></i> Back to Transactions</a>
					</div>
					<div class="page-header">
						<h2>{{$account->name}}</h2>
						<small><strong>Account ID:</strong> {{$account->id}}</small>
					</div>
					<div class="row">
						<div class="col-md-12">
							<ul class="breadcrumb">
							  	<li class="active"><a href="{{route('accounts_index')}}">Investor</a></li>
							  	<li class="active"><a href="{{route('view_soa', ['id' => $account->id])}}">View Statement of Account</a></li>
							  	<li class="active">View Transaction</li>
							</ul>
						</div>
					</div>
					<div id="viewTransactionFormContainer"></div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection