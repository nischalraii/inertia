<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Status;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'body',
        'category_id',
        'tags',
        'featured_image',
        'status', // Ensure status is fillable
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            if (empty($post->status)) {
                $post->status = 'draft'; // Default value for status
            }
        });
    }

    protected $appends = [
        'categoryName',
        'statusName',
        'authorName',
    ];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function getAuthorNameAttribute(){
        $user = User::find($this->user_id);
        return $user->name;
    }

    public function getCategoryNameAttribute(){
        return $this->category->name;
    }

    public function status(){
        return $this->belongsTo(Status::class);
    }

    public function getStatusNameAttribute(){
        return $this->status->name;
    }
}
