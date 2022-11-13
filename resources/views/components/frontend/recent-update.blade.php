<!-- latest notice or activities -->
<section class="mt-0">
    <div class="d-flex update-notice">
        <div class="bg-danger">
            <p class="text-light title text-uppercase"><strong>Updates</strong></p>
        </div>
        <div class="flex-fill">

            <marquee class="mt-2" style="color:#7c0004;" scrollamount="10" scrolldelay="1" direction="left"
                onmouseover="this.stop()" onmouseout="this.start()">
                @forelse ($recentNotices as $recentNotice)
                    <span> ➦ </span><a href="{{ url('notices/' . $recentNotice->slug) }}"
                        style="color: #000621;">{{ $recentNotice->title }}</a>
                @empty
                    <span> ➦ </span><a href="#" style="color: #000621;">No Data Available.</a>
                @endforelse
            </marquee>
        </div>
    </div>
</section>
<!-- end of latest notice or activities -->
