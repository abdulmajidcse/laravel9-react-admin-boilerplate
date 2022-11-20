<?php

namespace App\Http\Controllers\Api\NoNeedAuth;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\NoNeedAuth\AllCategoryCollection;

class CategoryController extends Controller
{
    public function allCategories()
    {
        $categories = Category::orderBy('name')->get();
        return new AllCategoryCollection($categories);
    }
}
