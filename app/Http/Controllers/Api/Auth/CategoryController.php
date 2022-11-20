<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ErrorResource;
use Illuminate\Validation\Rules\File;
use App\Http\Resources\SuccessResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\SuccessCollection;
use App\Services\FileStorageService;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    use FileStorageService;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categories = Category::latest()->paginate(intval($request->query('paginate', 10)));
        return new SuccessCollection($categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // If user has not super admin role, return 403 response
        if (!$request->user()->hasRoles('Super Admin')) {
            return new ErrorResource([], 403, 'Forbidden');
        }

        $validation = Validator::make($request->all(), [
            'name' => 'required|string|max:180',
            'image' => ['required', File::types(['jpg', 'jpeg', 'png',])->max(5 * 1024)],
        ]);

        if ($validation->fails()) {
            return new ErrorResource($validation->getMessageBag());
        }

        $data = $validation->validated();

        // create a new slug
        $lastCategory = Category::latest()->first();
        $data['slug'] = Str::slug($data['name'] . ' ' . $lastCategory?->id ?: 1);
        // upload image
        $data['image'] = $this->fileStorage($data['image'], 'categories');

        Category::create($data);

        return new SuccessResource([], 200, 'Category Created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return new SuccessResource($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        // If user has not super admin role, return 403 response
        if (!$request->user()->hasRoles('Super Admin')) {
            return new ErrorResource([], 403, 'Forbidden');
        }

        $validation = Validator::make($request->all(), [
            'name' => 'required|string|max:180',
            'image' => ['nullable', File::types(['jpg', 'jpeg', 'png',])->max(5 * 1024)],
        ]);
        if ($validation->fails()) {
            return new ErrorResource($validation->getMessageBag());
        }

        $data = $validation->validated();

        // create a new slug
        $data['slug'] = Str::slug($data['name'] . ' ' . $category->id);

        // upload and delete old image
        if ($request->hasFile('image')) {
            $data['image'] = $this->fileStorage($data['image'], 'categories', $category->image);
        } else {
            unset($data['image']);
        }

        $category->update($data);

        return new SuccessResource([], 200, 'Category Updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Category $category)
    {
        // If user has not super admin role, return 403 response
        if (!$request->user()->hasRoles('Super Admin')) {
            return new ErrorResource([], 403, 'Forbidden');
        }

        Storage::delete($category->image);
        $category->forceDelete();

        return new SuccessResource([], 200, 'Category Deleted.');
    }
}
