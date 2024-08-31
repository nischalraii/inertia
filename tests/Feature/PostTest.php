<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Post;
use App\Models\Category;
use App\Models\Status;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public $user;
    public $category;
    public $status;

    protected function setUp(): void
    {
        parent::setUp();

        // Create common data
        $this->user = User::factory()->create();
        $this->category = Category::factory()->create();
        $this->status = Status::factory()->create();
    }

    /** @test */
    public function a_user_can_view_the_list_of_posts()
    {
        $post = Post::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)->get('/posts');

        $response->assertStatus(200);
        $response->assertSee($post->title);
    }

    /** @test */
    public function a_user_can_view_the_create_post_form()
    {
        $response = $this->actingAs($this->user)->get('/posts/create');

        $response->assertStatus(200);
        $response->assertViewHas('categories');
    }

    /** @test */
    public function a_user_can_create_a_post()
    {
        $response = $this->actingAs($this->user)->post('/posts', [
            'title' => 'New Post Title',
            'body' => 'Post body content',
            'category_id' => $this->category->id,
            'tags' => 'tag1, tag2',
            'status_id' => $this->status->id,
        ]);

        $response->assertRedirect('/posts');
        $this->assertDatabaseHas('posts', [
            'title' => 'New Post Title',
            'body' => 'Post body content',
            'category_id' => $this->category->id,
            'tags' => 'tag1, tag2',
            'status_id' => $this->status->id,
        ]);
    }

    /** @test */
    public function a_user_can_view_a_single_post()
    {
        $post = Post::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)->get('/posts/' . $post->id);

        $response->assertStatus(200);
        $response->assertViewHas('post', $post);
    }

    /** @test */
    public function a_user_can_view_the_edit_post_form()
    {
        $post = Post::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)->get('/posts/' . $post->id . '/edit');

        $response->assertStatus(200);
        $response->assertViewHas('post', $post);
        $response->assertViewHas('categories');
        $response->assertViewHas('status');
    }

    /** @test */
    public function a_user_can_update_a_post()
    {
        $post = Post::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)->put('/posts/' . $post->id, [
            'title' => 'Updated Post Title',
            'body' => 'Updated post body content',
            'category_id' => $this->category->id,
            'tags' => 'tag3, tag4',
            'status_id' => $this->status->id,
        ]);

        $response->assertRedirect('/posts');
        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'title' => 'Updated Post Title',
            'body' => 'Updated post body content',
            'category_id' => $this->category->id,
            'tags' => 'tag3, tag4',
            'status_id' => $this->status->id,
        ]);
    }

    /** @test */
    public function a_user_can_delete_a_post()
    {
        $post = Post::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)->delete('/posts/' . $post->id);

        $response->assertRedirect('/posts');
        $this->assertDatabaseMissing('posts', [
            'id' => $post->id,
        ]);
    }
}
