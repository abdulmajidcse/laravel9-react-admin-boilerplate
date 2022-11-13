<x-guest-layout>
    <x-slot name="tabTitle">Register</x-slot>

    <div class="card-body">
        <p class="login-box-msg">Create an account </p>

        <!-- Session Status -->
        <x-auth-session-status class="mb-4" :status="session('status')" :statusType="session('statusType') ?? 'danger'" />

        <form method="POST" action="{{ route('register') }}" enctype="multipart/form-data">
            @csrf
            <div class="input-group mb-3">
                <input type="text" name="name" class="form-control @error('name') is-invalid @enderror"
                    placeholder="Full Name" value="{{ old('name') }}" required autofocus>
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-user"></span>
                    </div>
                </div>
                @error('name')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>

            <div class="input-group mb-3">
                <input type="email" name="email" class="form-control @error('email') is-invalid @enderror"
                    placeholder="Email" value="{{ old('email') }}" required>
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                    </div>
                </div>
                @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>

            <div class="input-group mb-3">
                <select name="type_of_member" id="type_of_member"
                    class="form-control @error('type_of_member') is-invalid @enderror" required>
                    <option value="" disabled selected>Type of member</option>
                    <option value="Buyer" {{ old('type_of_member') == 'Buyer' ? 'selected' : '' }}>Buyer</option>
                    <option value="Seller" {{ old('type_of_member') == 'Seller' ? 'selected' : '' }}>Seller</option>
                </select>
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-user-plus"></span>
                    </div>
                </div>
                @error('type_of_member')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>

            <div class="input-group mb-3">
                <input type="password" name="password" class="form-control @error('password') is-invalid @enderror"
                    placeholder="Password" required autocomplete="current-password">
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                    </div>
                </div>
                @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>

            <div class="input-group mb-3">
                <input type="password" name="password_confirmation" class="form-control" placeholder="Confirm Password"
                    required autocomplete="current-password">
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <button type="submit" class="btn btn-primary btn-block">Create</button>
                </div>
            </div>
        </form>

        <p class="mt-2">
            <a href="{{ route('login') }}">Already have an account?</a>
        </p>
    </div>
    <!-- /.card-body -->

</x-guest-layout>
