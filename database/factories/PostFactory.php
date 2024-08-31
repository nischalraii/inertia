<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'title' => fake()->sentence(),
            'body' => fake()->paragraphs(3, true),
            'category_id' => Category::inRandomOrder()->first()->id, // Creates a new Category
            'tags' => implode(',', fake()->words(3)), // Comma-separated tags
            'featured_image' => fake()->imageUrl(640, 480, 'cats', true, 'Faker'),
            'status_id' => Status::inRandomOrder()->first()->id,
            'user_id' => User::find(1)->id,
        ];
    }
}
