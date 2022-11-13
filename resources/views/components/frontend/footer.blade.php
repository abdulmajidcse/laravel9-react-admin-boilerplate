<!-- ======= Footer ======= -->
<footer id="footer">
    <div class="footer-top">
        <div class="container">
            <div class="row">

                <div class="col-lg-3 col-md-6 footer-info">
                    <h3 class="border-start-0"><img src="{{ asset('./assets/img/logo.png') }}" style="max-height: 40px;"
                            alt="Logo">
                        <span>IQAC</span>
                    </h3>
                    <div>{!! Str::words($aboutPages[0]?->content, 33) !!}</div>
                </div>

                <div class="col-lg-3 col-md-6 footer-links">
                    <h4>University</h4>
                    <ul>
                        <li><i class="bi bi-chevron-right"></i> <a href="https://mbstu.ac.bd/">MBSTU Website</a></li>
                        <li><i class="bi bi-chevron-right"></i> <a href="https://mbstu.ac.bd/admin.html">MBSTU
                                Administration</a></li>
                        <li><i class="bi bi-chevron-right"></i> <a href="https://journal.mbstu.ac.bd/">MBSTU Journal</a>
                        </li>
                        <li><i class="bi bi-chevron-right"></i> <a href="https://mbstu.ac.bd/ipphone.html">MBSTU IP
                                Phone List</a></li>
                    </ul>
                </div>

                <div class="col-lg-3 col-md-6 footer-links">
                    <h4>IQAC</h4>
                    <ul>
                        <li><i class="bi bi-chevron-right"></i> <a
                                href="https://iqac.rnasoft.website/about/context-of-iqac-1">About</a></li>
                        <li><i class="bi bi-chevron-right"></i> <a
                                href="https://iqac.rnasoft.website/notices">Notice</a></li>
                        <li><i class="bi bi-chevron-right"></i> <a
                                href="https://iqac.rnasoft.website/galleries">Gallery</a></li>
                        <li><i class="bi bi-chevron-right"></i> <a
                                href="https://iqac.rnasoft.website/downloads">Downloads</a></li>
                    </ul>
                </div>

                <div class="col-lg-3 col-md-6 footer-contact">
                    <h4>Contact Us</h4>
                    <p>
                        {{ $setting?->address ?: 'N/A' }} <br>
                        <strong>Phone:</strong> {{ $setting?->mobile ?: 'N/A' }}<br>
                        <strong>Email:</strong> {{ $setting?->email ?: 'N/A' }}<br>
                    </p>

                    <div class="social-links">
                        <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                        <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
                    </div>

                </div>

            </div>
        </div>
    </div>

    <div class="container">
        <div class="copyright">
            &copy; 2022 Copyright <strong>IQAC</strong>. All Rights Reserved.
        </div>
    </div>
</footer><!-- End Footer -->

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
        class="bi bi-arrow-up-short"></i></a>
<!-- Uncomment below i you want to use a preloader -->
<!-- <div id="preloader"></div> -->
