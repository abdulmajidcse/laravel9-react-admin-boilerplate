<?php

namespace App\Services;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

trait FileStorageService
{
    /**
     * upload
     *
     * @param  mixed $file
     * @param  mixed $path
     * @param  mixed $oldFilePath
     * @param  mixed $width (For Image only)
     * @param  mixed $height (For Image only)
     * @return void
     */
    public function fileStorage($file, $path = '', $oldFilePath = null)
    {
        // file not exist
        try {
            if (!$file->isValid()) {
                return false;
            }
        } catch (\Throwable $e) {
            return false;
        }

        // get file extension
        $extension = $file->extension();

        // set file name and upload
        $fileName     = Str::random(40) . '.' . $extension;
        $path         = $path . date('/Y/m/d');
        $uploadedPath = Storage::putFileAs($path, $file, $fileName);

        // delete old picture if exist
        $oldFilePath && Storage::delete($oldFilePath);

        return $uploadedPath;
    }
}