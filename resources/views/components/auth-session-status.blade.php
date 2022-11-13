@props(['status', 'statusType' => 'success'])

@if ($status)
    <div {{ $attributes->merge(['class' => 'alert alert-' . $statusType . ' alert-dismissible fade show']) }}
        role="alert">
        {{ $status }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
@endif
