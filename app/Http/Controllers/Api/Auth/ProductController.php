<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ProductCategory;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\SuccessResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\SuccessCollection;
use App\Http\Requests\Api\Auth\StoreProductRequest;
use App\Http\Requests\Api\Auth\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $products = Product::latest()->paginate(intval($request->query('paginate', 10)));
        return new SuccessCollection($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $productData = $request->safe()->except('category_ids');
        $productData['currency'] = 'BDT';
        $productData['user_id'] = auth()->id();

        // create a new slug
        $lastProduct = Product::latest()->first();
        $productData['slug'] = Str::slug($productData['name'] . ' ' . $lastProduct?->id ?: 1);
        // upload image
        $productData['image'] = $this->fileStorage($productData['image'], 'products');

        // category ids
        $categoryIds = $request->safe()->only('category_ids');

        // start db transaction for product and product-category
        DB::transaction(function () use ($categoryIds, $productData) {
            $product = Product::create($productData);

            foreach ($categoryIds as $categoryId) {
                ProductCategory::create([
                    'product_id' => $product->id,
                    'category_id' => $categoryId,
                ]);
            }
        });

        return new SuccessResource([], 200, 'Product Created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return new SuccessResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $productData = $request->safe()->except('category_ids');

        // create a new slug
        $productData['slug'] = Str::slug($productData['name'] . ' ' . $product->id);
        // upload and delete old image
        if ($request->hasFile('image')) {
            $productData['image'] = $this->fileStorage($productData['image'], 'products', $product->image);
        } else {
            unset($productData['image']);
        }

        // category ids
        $categoryIds = $request->safe()->only('category_ids');

        // start db transaction for product and product-category
        DB::transaction(function () use ($categoryIds, $product, $productData) {
            $product->update($productData);

            foreach ($categoryIds as $categoryId) {
                $isProductCategoryExist = ProductCategory::where('product_id', $product->id)->where('category_id', $categoryId)->first();

                if (!$isProductCategoryExist) {
                    ProductCategory::create([
                        'product_id' => $product->id,
                        'category_id' => $categoryId,
                    ]);
                }
            }
        });

        return new SuccessResource([], 200, 'Product Updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        Storage::delete($product->image);
        $product->forceDelete();

        return new SuccessResource([], 200, 'Product Deleted.');
    }
}
