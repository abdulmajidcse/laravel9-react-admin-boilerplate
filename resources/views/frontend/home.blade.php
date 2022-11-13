<x-frontend-layout tab-title="Home">
    @push('styles')
        <style>
            .director-message-box {
                line-height: 27.5px;
                text-align: justify;
            }

            .director-message-box img {
                margin-left: 30px;
                margin-top: 5px;
                float: right;
                width: 200px;
                border: 4px ridge #ffe10a;
            }

            .director-message-box::after {
                content: "";
                clear: both;
                display: table;
            }
        </style>
    @endpush

    <!-- ======= hero Section ======= -->
    <section id="hero">
        <div class="hero-container">
            <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">

                <ol id="hero-carousel-indicators" class="carousel-indicators"></ol>

                <div class="carousel-inner" role="listbox">

                    @foreach ($sliders as $slider)
                        <div class="carousel-item {{ $loop->first ? 'active' : '' }}"
                            style="background-image: url({{ Storage::url($slider->image) }})">
                            <div class="carousel-container">
                                <!--<h2>Welcome to Institutional Quality Assurance Cell</h2>-->
                            </div>
                        </div>
                    @endforeach

                </div>

                <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
                </a>

                <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
                    <span class="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
                </a>

            </div>
        </div>
    </section><!-- End Hero Section -->

    <x-frontend.recent-update />

    <main id="main">

        <!-- director message -->
        <section class="container mt-5">
            <div style="padding: 30px;margin: 0 0 60px 20px;box-shadow: 0 4px 16px rgb(0 0 0 / 10%);">
                <div class="section-header">
                    <h3 class="title text-center">MESSAGE FROM THE DIRECTOR, IQAC</h3>
                </div>
                <div class="director-message-box">
                    <img src="{{ Storage::url($setting->director_image) }}" alt="Director, IQAC">
                    {{ $setting->director_message }}
                </div>
                <p class="mt-3"><strong>Professor Dr. Md. Omar Faruk <br>Director, IQAC</strong></p>
            </div>
        </section>
        <!-- end of director message-->

        <!-- welcome section -->
        <section class="container mt-5 blog">
            <div class="row p-2">
                <div class="col-lg-7">
                    <div class="sidebar">
                        <div class="section-header">
                            <h3 class="title text-center">Welcome To IQAC</h3>
                        </div>
                        <div class="text-justify" style="line-height: 27.5px">{!! Str::words($aboutPages[0]?->content, 185) !!}</div>
                        <a href="{{ url('about/' . $aboutPages[0]?->slug) }}"
                            class="btn btn-dark border btn-sm rounded-pill border-dark text-white">
                            <strong><i class="bi bi-plus-lg"></i> Read More</strong></a>

                    </div>
                </div>
                <div class="col-lg-5">
                    <x-frontend.recent-notice />
                </div>
            </div>
        </section>
        <!-- end of welcome section -->

        <section id="portfolio" class="section-bg">
            <div class="container" data-aos="fade-up">

                <header class="section-header">
                    <h3 class="section-title">Recent Memories</h3>
                </header>



                <div class="row portfolio-container" data-aos="fade-up" data-aos-delay="200">

                    @forelse ($galleries as $gallery)
                        <div class="col-lg-4 col-md-6 portfolio-item filter-app">
                            <div class="portfolio-wrap">
                                <figure>
                                    <img src="{{ Storage::url($gallery->image) }}" class="img-fluid" alt="Gallery">
                                    <a href="{{ Storage::url($gallery->image) }}" data-lightbox="portfolio"
                                        data-title="{{ $gallery->title }}" class="link-preview portfolio-lightbox"><i
                                            class="bi bi-plus"></i></a>
                                </figure>

                                <div class="portfolio-info">
                                    <h4>{{ $gallery->title }}</h4>
                                    <p>{{ $gallery->short_description }}</p>
                                </div>
                            </div>
                        </div>
                    @empty
                        <div class="col-12 portfolio-item filter-app">
                            <div class="portfolio-wrap text-center text-danger m-3 p-3">
                                No Data Available.
                            </div>
                        </div>
                    @endforelse

                </div>

            </div>
        </section><!-- End Portfolio Section -->

    </main><!-- End #main -->
</x-frontend-layout>
