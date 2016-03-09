@extends('layouts.master')
@section('title', 'View Statement of Account')
@section('content')
@include('layouts.nav')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-10 col-md-offset-1">
			<div class="panel panel-default">
				<div class="panel-body">
					<div class="pull-left">
						<a href="{{route('accounts_index')}}"><i class="fa fa-chevron-left fa-fw"></i> Back to List</a>
					</div>
					<div class="page-header">
						<h2>{{$account->name}}</h2>
						<small><strong>Account ID:</strong> {{$account->id}}</small>
					</div>
					<div class="row">
						<div class="col-md-12">
							<ul class="breadcrumb">
							  	<li class="active"><a href="{{route('accounts_index')}}">Investor</a></li>
							  	<li class="active">View Statement of Account</li>
							</ul>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="pull-right">
								<a href="{{route('transactions_add', ['id' => $account->id])}}" class="btn btn-primary btn-raised btn-xs">Add New Transaction</a>
							</div>
						</div>
					</div>
					<div id="transactionsTableContainer"></div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection