<x-guest-layout>
  <x-slot name="tabTitle">Reset Password</x-slot>

    <div class="card-body">
        <p class="login-box-msg">Reset Your Password.</p>
        
        @error('token')
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
              {{ $message }}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
        @enderror

        <form method="POST" action="{{ route('password.update') }}">
          @csrf

          <!-- Password Reset Token -->
          <input type="hidden" name="token" value="{{ $request->route('token') }}">

          <div class="input-group mb-3">
            <input type="email" name="email" class="form-control @error('email') is-invalid @enderror" placeholder="Email" value="{{ old('email', $request->email) }}" required autofocus>
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
              <input type="password" name="password" class="form-control @error('password') is-invalid @enderror" placeholder="New Password" required autocomplete="current-password">
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
            <input type="password" name="password_confirmation" class="form-control" placeholder="Confirm Password" required>
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button type="submit" class="btn btn-primary btn-block">Change Password</button>
            </div>
            <!-- /.col -->
          </div>
        </form>
  
        <p class="mt-2">
          <a href="{{ route('login') }}">Back to Login</a>
        </p>
    </div>
    <!-- /.login-card-body -->
</x-guest-layout>
