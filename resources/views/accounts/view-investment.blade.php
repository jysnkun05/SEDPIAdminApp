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
						<div class="col-md-3">
								<ul class="nav nav-pills nav-stacked">
									<li><a href="{{route('view_account_details', ['id' => $account->id])}}">Account Details</a></li>
									<li class="active"><a href="{{route('view_investment_details', ['id' => $account->id])}}">Investment Details</a></li>
								</ul>
						</div>
						<div class="col-md-9">
							<div class="panel panel-default">
								<div class="panel-heading">
									Investment Details (Statement of Account)
								</div>
								<div class="panel-body">
									<div class="col-md-12">
										<table class="table table-striped table-hover table-condensed">
											<thead>
												<tr>
													<th class="text-center">#</th>
													<th class="text-center">Transaction Details</th>
													<th class="text-center">Debit</th>
													<th class="text-center">Credit</th>
													<th class="text-center">Running Balance</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td colspan="5" class="text-center"><i class="fa fa-exclamation-triangle fa-fa"></i> No Transaction Posted.</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection