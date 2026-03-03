<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Space;
use App\Models\Equipement;
use App\Models\Reservation;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
public function run()
{
// 3. Users normaux (10)
User::factory(10)->create();
// 4. Spaces (15)
$spaces = Space::factory(15)->create();
// 5. Attacher équipements aux spaces
foreach ($spaces as $space) {
$space->equipements()->attach(
Equipement::inRandomOrder()->take(rand(2, 5))->pluck('id')
);
}
// 6. Réservations (50)
Reservation::factory(50)->create();
}

}
