<!-- ======= Header ======= -->
<header id="header" class="fixed-top d-flex align-items-center {{ request()->is('/') ? 'header-transparent' : '' }}">
    <div class="container-fluid">

        <div class="row justify-content-center align-items-center">
            <div class="col-xl-11 d-flex align-items-center justify-content-between">
                <h1 class="logo border-start-0"><a href="{{ url('/') }}"><img src="{{ asset('assets/img/logo.png') }}"
                            alt="Logo">
                        <span>IQAC</span></a></h1>
                <!-- Uncomment below if you prefer to use an image logo -->
                <!-- <a href="index.html" class="logo"><img src="{{ asset('assets/img/logo.png') }}" alt="" class="img-fluid"></a>-->

                <nav id="navbar" class="navbar">
                    <ul>
                        <li><a class="nav-link {{ request()->is('/') ? 'active' : '' }}"
                                href="{{ url('/') }}">Home</a></li>
                        <li class="dropdown"><a href="#"
                                class="{{ request()->is('about/*') ? 'active' : '' }}"><span>About IQAC</span> <i
                                    class="bi bi-chevron-down"></i></a>
                            <ul>
                                @forelse ($aboutPages as $aboutPage)
                                    <li><a href="{{ url('about/' . $aboutPage->slug) }}"
                                            @if (request()->is('about/' . $aboutPage->slug)) style="color: #0043ff;" @endif>{{ $aboutPage->title }}</a>
                                    </li>
                                @empty
                                    <li><a href="#">N/A</a></li>
                                @endforelse
                            </ul>
                        </li>
                        <li class="dropdown"><a href="#"
                                class="{{ request()->is('iqac-office/*') ? 'active' : '' }}"><span>IQAC Office</span> <i
                                    class="bi bi-chevron-down"></i></a>
                            <ul>
                                <li><a href="{{ url('iqac-office/1') }}"
                                        @if (request()->is('iqac-office/1')) style="color: #0043ff;" @endif>Director and
                                        Additional Director</a></li>
                                <li><a href="{{ url('iqac-office/2') }}"
                                        @if (request()->is('iqac-office/2')) style="color: #0043ff;" @endif>Officers and
                                        Staffs</a></li>
                                <li><a href="{{ url('iqac-office/3') }}"
                                        @if (request()->is('iqac-office/3')) style="color: #0043ff;" @endif>Formar Director
                                        and Additional Director</a></li>
                            </ul>
                        </li>
                        <li class="dropdown"><a href="#"
                                class="{{ request()->is('committees/*') ? 'active' : '' }}"><span>Committee</span> <i
                                    class="bi bi-chevron-down"></i></a>
                            <ul>
                                <li><a href="{{ url('committees/1') }}"
                                        @if (request()->is('committees/1')) style="color: #0043ff;" @endif>QAC</a></li>
                                <li><a href="{{ url('committees/2') }}"
                                        @if (request()->is('committees/2')) style="color: #0043ff;" @endif>FQAC</a></li>
                                <li><a href="{{ url('committees/3') }}"
                                        @if (request()->is('committees/3')) style="color: #0043ff;" @endif>PSAC</a></li>
                            </ul>
                        </li>
                        <li class="dropdown"><a href="#"
                                class="{{ request()->is('news-and-events/*') ? 'active' : '' }}"><span>News &
                                    Events</span> <i class="bi bi-chevron-down"></i></a>
                            <ul>
                                <li><a href="{{ url('news-and-events/1') }}"
                                        @if (request()->is('news-and-events/1')) style="color: #0043ff;" @endif>Training
                                        and Workshops</a></li>
                                <li><a href="{{ url('news-and-events/2') }}"
                                        @if (request()->is('news-and-events/2')) style="color: #0043ff;" @endif>Meeting and
                                        Conference</a></li>
                                <li><a href="{{ url('news-and-events/3') }}"
                                        @if (request()->is('news-and-events/3')) style="color: #0043ff;" @endif>Occational
                                        News</a></li>
                            </ul>
                        </li>
                        <li><a class="nav-link {{ request()->is('downloads') ? 'active' : '' }}"
                                href="{{ url('downloads') }}">Downloads</a></li>
                        <li><a class="nav-link {{ request()->is('notices') ? 'active' : '' }}"
                                href="{{ url('notices') }}">Notice Board</a></li>
                        <li><a class="nav-link {{ request()->is('galleries') ? 'active' : '' }}"
                                href="{{ url('galleries') }}">Gallery</a></li>
                        <li><a class="nav-link {{ request()->is('contact') ? 'active' : '' }}"
                                href="{{ url('contact') }}">Contact</a></li>
                    </ul>
                    <i class="bi bi-list mobile-nav-toggle"></i>
                </nav><!-- .navbar -->
            </div>
        </div>

    </div>
</header><!-- End Header -->
