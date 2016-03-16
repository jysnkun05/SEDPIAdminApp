<div class="navbar navbar-default">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="{{url('/')}}">
				<img src="{{'/images/sedpi_logo.png'}}" width="100px" alt="SEDPI Logo"/>
			</a>
		</div>
		<div class="navbar-collapse collapse navbar-responsive-collapse">
			<ul class="nav navbar-nav">
				<li class="active"><a href="{{route('accounts_index')}}">Investors</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li class="dropdown">
					<a href="bootstrap-elements.html" data-target="#" class="dropdown-toggle" data-toggle="dropdown">{{Auth::user()->name}}
						<b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="{{url('logout')}}">Logout</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>