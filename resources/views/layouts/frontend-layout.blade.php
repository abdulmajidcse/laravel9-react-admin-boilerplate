<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>{{ $tabTitle }} - {{ config('app.name') }}</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Favicons -->
    <link href="{{ asset('assets/img/logo.png') }}" rel="icon">

    <x-frontend.styles />

    @stack('styles')
</head>

<body>

    <x-frontend.header />

    {{ $slot }}

    <x-frontend.footer />

    <x-frontend.scripts />

    @stack('scripts')
</body>

</html>
