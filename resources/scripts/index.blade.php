@extends('layouts.admin')

@section('title')
    Administration
@endsection

@section('content-header')
    <h1>Administrative Overview<small>A quick glance at your system.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Index</li>
    </ol>
@endsection

@section('content')
<div class="row">
    <div class="col-xs-12">
        <div class="box
            @if($version->isLatestPanel())
                box-success
            @else
                box-danger
            @endif
        ">
            <div class="box-header with-border">
                <h3 class="box-title">System Information</h3>
            </div>
            <div class="box-body">
                @if ($version->isLatestPanel())
                    You are running Pterodactyl Panel version <code>{{ config('app.version') }}</code>. Your panel is up-to-date! | You are running MineCube Theme Version 1.0
                @else
                    Your panel is <strong>not up-to-date!</strong> The latest version is <a href="https://github.com/Pterodactyl/Panel/releases/v{{ $version->getPanel() }}" target="_blank"><code>{{ $version->getPanel() }}</code></a> and you are currently running version <code>{{ config('app.version') }}</code>.
                @endif
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-xs-6 col-sm-3 text-center">
        <a href="https://discord.gg/WvzNPpKr"><button class="btn btn-success" style="width:100%;"><i class="fa fa-fw fa-support"></i>Theme Support</button></a>
    </div>
</div>
@endsection
