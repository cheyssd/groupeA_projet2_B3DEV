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
        // 1. Admin
        User::factory()->create([
            'firstname' => 'Admin',
            'lastname' => 'Main',
            'email' => 'admin@ecowork.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'accepted_tos' => true,
        ]);

        //2.admin
        User::factory()->create([
            'firstname' => 'Admin2',
            'lastname' => 'Second',
            'email' => 'superadmin@ecowork.com',
            'password' => bcrypt('superpass123'),
            'role' => 'admin',
            'accepted_tos' => true,
        ]);


        // 2. Users normaux (10)
        User::factory(10)->create();

        // 3. Équipements
        $equipements = [
            'Vidéo projecteur', 'Climatisation', 'Wifi haut débit',
            'Machine à café', 'Photocopieur', 'Sono et micro',
            'Grande table de réunion', 'Table individuelle',
        ];
        foreach ($equipements as $nom) {
            Equipement::create(['name' => $nom]);
        }

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
