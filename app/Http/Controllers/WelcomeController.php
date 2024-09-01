<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index()
    {
        // Fetch the latest 5 posts
        $posts = Post::latest()->take(5)->get();

        // Return the Inertia response with posts data
        return Inertia::render('Welcome', [
            'posts' => $posts
        ]);
    }
}