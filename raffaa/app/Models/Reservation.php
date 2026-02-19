<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    /** @use HasFactory<\Database\Factories\ReservationFactory> */
    use HasFactory;
     protected $fillable = [
            'status',
            'start_date',
            'end_date',
            'total_price',
            'is_paid',
     ];
}
