<?php

// app/Http/Controllers/ApiController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Post;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;

class ApiController extends Controller
{
    // Handle user login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('YourAppName')->plainTextToken;

            return response()->json([
                'token' => $token,
                'user' => $user
            ], 200);
        } else {
            return response()->json([
                'error' => 'Invalid credentials'
            ], 401);
        }
    }

    // List all posts
    public function apiPostIndex(Request $request)
    {
        $user_id = $request->user()->id;
        $posts = Post::where('user_id', $user_id)->get();
        return response()->json($posts, 200);
    }

    // Store a new post
    public function apiPostStore(Request $request)
    {
        try {
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

            // Debugging: Check if post was saved successfully
            if ($post) {
                return response()->json($post, 201);
            } else {
                return response()->json(['error' => 'Failed to create post'], 500);
            }
        } catch (\Exception $e) {
            // Handle and log exceptions
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Show a single post
    public function apiPostShow($id)
    {
        $post = Post::find($id);
        if ($post) {
            return response()->json($post, 200);
        } else {
            return response()->json(['error' => 'Post not found'], 404);
        }
    }

    // Update a post
    public function apiPostUpdate(Request $request, $id)
    {
        try {
            // Validate only the fields that are present in the request
            $validated = $request->only(['title', 'body', 'category_id', 'tags', 'status_id']);
    
            // Find the post by ID or fail with a 404 error
            $post = Post::findOrFail($id);
    
            // Update only the fields that are provided
            if (isset($validated['title'])) {
                $post->title = $validated['title'];
            }
            if (isset($validated['body'])) {
                $post->body = $validated['body'];
            }
            if (isset($validated['category_id'])) {
                $post->category_id = $validated['category_id'];
            }
            if (isset($validated['tags'])) {
                $post->tags = $validated['tags'];
            }
            if (isset($validated['status_id'])) {
                $post->status_id = $validated['status_id'];
            }
    
            // Handle featured image update if a file is present
            if ($request->hasFile('featured_image')) {
                // Remove old image if it exists
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
    
            // Return the updated post as a JSON response
            return response()->json($post, 200);
        } catch (\Exception $e) {
            // Handle and log exceptions
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    

    // Delete a post
    public function apiPostDestroy($id)
    {
        $post = Post::find($id);
        if ($post) {
            if ($post->featured_image && file_exists(public_path('images/' . $post->featured_image))) {
                unlink(public_path('images/' . $post->featured_image));
            }

            $post->delete();
            return response()->json(['message' => 'Post deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'Post not found'], 404);
        }
    }

    // Fetch news from an external API
    public function fetchNews()
    {
        try {
            $response = Http::get('https://newsapi.org/v2/top-headlines', [
                'country' => 'us',
                'apiKey' => env('NEWS_API_KEY'),
            ]);

            if ($response->failed()) {
                return response()->json(['error' => 'Failed to fetch news'], 500);
            }

            return response()->json($response->json());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
