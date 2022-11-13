<div class="sidebar">

    <div class="section-header float-start">
        <h3 class="sidebar-title pb-2">Recent Notices</h3>
    </div>
    <div class="clearfix"></div>
    <div class="sidebar-item categories">
        <ul>
            @forelse ($recentNotices as $recentNotice)
                <li>
                    <a href="{{ url('notices/' . $recentNotice->slug) }}">
                        <h5 class="mb-1">{{ $recentNotice->title }}</h5>
                        <ul class="border-bottom pb-2">
                            <li class="mb-1">
                                <span>
                                    Published:
                                    {{ $recentNotice->created_at->format('d M, Y') }}</span>
                            </li>
                            <li>
                                <a href="{{ url('notices/' . $recentNotice->slug) }}"
                                    class="btn btn-dark border btn-sm rounded-pill border-dark text-white">
                                    <strong><i class="bi bi-plus-lg"></i> Read More</strong></a>
                            </li>

                        </ul>
                    </a>
                </li>
            @empty
                <li>
                    <div class="text-danger text-center">No Data Available.</div>
                </li>
            @endforelse
        </ul>
    </div><!-- End sidebar categories-->

</div>
