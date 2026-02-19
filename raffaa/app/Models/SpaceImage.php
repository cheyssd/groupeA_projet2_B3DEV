<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpaceImage extends Model
{
    /** @use HasFactory<\Database\Factories\SpaceImageFactory> */
    use HasFactory;
    protected $fillable = [
        'filename',
        'alt_text',
        'position',

    ];
}
