<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $tabTitle }} - {{ config('app.name') }}</title>
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('assets/plugins/fontawesome-free/css/all.min.css') }}">
    <!-- icheck bootstrap -->
    <link rel="stylesheet" href="{{ asset('assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('assets/dist/css/adminlte.min.css') }}">
    <!-- toastrjs css -->
    <link rel="stylesheet" href="{{ asset('assets/css/toastr.css') }}" />
</head>

<body class="hold-transition login-page">
    <div class="login-box">

        <x-auth_preloader />

        <!-- /.login-logo -->
        <div class="card card-outline card-primary">
            <div class="card-header text-center" style="margin-top: 10px; margin-bottom: 10px;">
                <a href="{{ url('/') }}">
                    <span class="text-primary h1">
                        <b>{{ config('app.name') }}</b>
                    </span>
                </a>
            </div>
            {{ $slot }}
        </div>
        <!-- /.card -->
    </div>
    <!-- /.login-box -->

    <!-- jQuery -->
    <script src="{{ asset('assets/plugins/jquery/jquery.min.js') }}"></script>
    <!-- Bootstrap 4 -->
    <script src="{{ asset('assets/plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <!-- AdminLTE App -->
    <script src="{{ asset('assets/dist/js/adminlte.min.js') }}"></script>
    <!-- toastr js -->
    <script src="{{ asset('assets/js/toastr.min.js') }}"></script>

    <script>
        // toastr js setup
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        // session message
        @if (Session::has('message') and Session::has('alert-type'))
            toastr["{{ Session::get('alert-type') }}"]("{{ Session::get('message') }}");
        @endif
    </script>

    @stack('scripts')
</body>

</html>
