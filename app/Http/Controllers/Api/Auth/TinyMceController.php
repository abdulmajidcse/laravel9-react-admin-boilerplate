<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\FileStorageService;
use App\Http\Resources\ErrorResource;
use Illuminate\Validation\Rules\File;
use App\Http\Resources\SuccessResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TinyMceController extends Controller
{
    use FileStorageService;

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'image' => ['required', File::image()->max(5 * 1024)],
            'image_old_url' => 'nullable|string',
        ]);

        if ($validation->fails()) {
            return new ErrorResource($validation->getMessageBag());
        }

        $data = $validation->validated();

        /**
         * get old image url and separate with array
         * check old image origianl path is exists or not
         */
        $imageOldPathArray = explode('uploads/', $data['image_old_url']);
        array_key_exists(1, $imageOldPathArray) ? $imageOldPath = $imageOldPathArray[1] : $imageOldPath = null;

        // upload image
        $imagePath = $this->fileStorage($data['image'], 'tinymce', $imageOldPath);

        return new SuccessResource(['image_url' => Storage::url($imagePath)]);
    }
}
