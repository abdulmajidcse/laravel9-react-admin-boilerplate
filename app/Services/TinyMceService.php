<?php

namespace App\Services;

use Illuminate\Support\Str;

trait TinyMceService
{
    public function tinyMceReplaceUrl(string $content)
    {
        $replaceText = 'src="' . url('uploads');

        $search  = array('src="uploads', 'src="/uploads', 'src="../uploads', 'src="../../uploads', 'src="../../../uploads', 'src="../../../../uploads');
        $replace = array($replaceText, $replaceText, $replaceText, $replaceText, $replaceText, $replaceText);
        return Str::replace($search, $replace, $content);
    }
}
