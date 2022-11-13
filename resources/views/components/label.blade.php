@props(['require'])

<label {{ $attributes }}>
    {{ $slot }}
    @if ($require ?? false)
        <span class="text-danger ml-1">*</span>
    @endif
</label>
