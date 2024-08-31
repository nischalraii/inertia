<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user_id = $request->user()->id;
        $posts = Post::where('user_id', $user_id)->get();

        return Inertia::render('Post/Index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        //
        return Inertia::render('Post/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'category_id' => 'required|integer',
            'tags' => 'nullable|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status_id' => 'required|integer',
        ]);

        $post = new Post();
        $post->user_id = Auth::user()->id;
        $post->title = $validated['title'];
        $post->body = $validated['body'];
        $post->category_id = $validated['category_id'];
        $post->tags = $validated['tags'];
        $post->status_id = $validated['status_id'];

        if ($request->hasFile('featured_image')) {
            $file = $request->file('featured_image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $post->featured_image = $filename;
        }

        $post->save();

        return redirect()->route('posts.index')->with('success', 'Post created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $post = Post::find($id);
        return Inertia::render('Post/Show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id)
    {
        // Find the post by ID or return a 404 error if not found
        $post = Post::find($id);
        $categories = Category::all();
        $status = Status::all();

        // Check if the post exists
        if (!$post) {
            abort(404, 'Post not found');
        }

        // Check if the authenticated user is the owner of the post
        if ($request->user()->id != $post->user_id) {
            abort(403, 'Post not found');
        }

        // If the post exists and the user is authorized, render the Edit page
        return Inertia::render('Post/Edit', [
            'post' => $post,
            'categories' => $categories,
            'status' => $status,
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate the request data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'category_id' => 'required|integer',
            'tags' => 'nullable|string',
            // 'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status_id' => 'required|integer' // Add validation for status if it's required
        ]);

        // Find the existing post by ID
        $post = Post::findOrFail($id);

        // Update the post fields
        $post->title = $validated['title'];
        $post->body = $validated['body'];
        $post->category_id = $validated['category_id'];
        $post->tags = $validated['tags'];
        $post->status_id = $validated['status_id']; // Update the status

        // Handle the featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete the old image if it exists
            if ($post->featured_image && file_exists(public_path('images/' . $post->featured_image))) {
                unlink(public_path('images/' . $post->featured_image));
            }

            // Upload the new image
            $file = $request->file('featured_image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $post->featured_image = $filename;
        }

        // Save the updated post
        $post->save();

        // Redirect or return a response
        return redirect()->route('posts.index')->with('success', 'Post updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Directly use the destroy method which returns the number of rows deleted
        Post::destroy($id);
        return redirect()->route('posts.index')->with('success', 'Post deleted successfully');
    }
}
