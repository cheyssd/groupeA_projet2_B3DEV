<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Space extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'surface',
        'capacity',
        'type',
        'price_per_day',
        'is_active',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function images()
    {
        return $this->hasMany(SpaceImage::class);
    }

    public function equipements()
    {
        return $this->belongsToMany(
            Equipement::class,
            'equipement_space',
            'space_id',
            'equipement_id'
        );
    }
}
