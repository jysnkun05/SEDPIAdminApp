@extends('layouts.master')
@section('title', 'Transactions')
@section('content')
@include('layouts.nav')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-10 col-md-offset-1">
			<div class="panel panel-default">
				<div class="panel-body">
					<div class="page-header">
						<h2>Investor Transactions</h2>
					</div>
					<ul class="nav nav-pills nav-justified" style="margin-bottom: 20px;">
						<li class="active"><a href="javascript:void(0)">Transactions</a></li>
						<li><a href="javascript:void(0)">Requests</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection