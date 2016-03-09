@extends('layouts.master')
@section('title', 'View Details')
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
							  	<li class="active">View Account</li>
							</ul>
						</div>
					</div>
					<div class="row">
						<div class="col-md-3">
								<ul class="nav nav-pills nav-stacked">
									<li class="active" href="{{route('view_account_details', ['id' => $account->id])}}"><a>Account Details</a></li>
								</ul>
						</div>
						<div class="col-md-9">
							<div class="panel panel-default">
								<div class="panel-heading">
									Account Details 
								</div>
								<div class="panel-body">
									<div class="pull-right">
										<div class="pull-right">
										<a class="btn btn-raised btn-xs" href="{{route('edit_account_details', ['id' => $account->id])}}"><i class="fa fa-pencil fa-xs"></i> Edit Account</a>
									</div>
									</div>
									<div class="form-horizontal">
										<div class="form-group">
											<label class="col-md-3 control-label">Account Name</label>
											<div class="col-md-8">
												<p class="form-control">{{$account->name}}</p>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 control-label">Account Type</label>
											<div class="col-md-8">
												<p class="form-control">{{$account->type}}</p>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 control-label">Email Address</label>
											<div class="col-md-8">
												<p class="form-control">{{$account->email === null ? 'Email Address not set.' : $account->email}}</p>
												@if(!$account->is_verified && $account->email !== null)
												<small>Email Address not yet Verified.</small>
												@elseif($account->is_verified && $account->email !== null)
												<small>Email Address Verified.</small>
												@endif
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									User Details 
								</div>
								<div class="panel-body">
									<div class="pull-right">
										<a class="btn btn-raised btn-xs" href="{{route('edit_user_details', ['id' => $account->id])}}"><i class="fa fa-pencil fa-xs"></i> Edit User</a>
									</div>
									<div class="form-horizontal">
										<div class="form-group">
											<label class="col-md-3 control-label">Display Name</label>
											<div class="col-md-8">
												<p class="form-control">{{$account->investorUser->name}}</p>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 control-label">Username</label>
											<div class="col-md-8">
												<p class="form-control">{{$account->investorUser->username ===  null || $account->investorUser->username === '' ? 'Username not set.' : $account->investorUser->username}}</p>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 control-label">Password</label>
											<div class="col-md-8">
												<p class="form-control">{{$account->investorUser->password_changed_at === null ? 'Password not set.' : $account->investorUser->password_changed_at}}</p>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 control-label">Status</label>
											<div class="col-md-8">
												<p class="form-control">{{$account->investorUser->is_active ? 'Active' : 'Inactive'}}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div id="viewAccountContainer"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection