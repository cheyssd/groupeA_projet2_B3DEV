<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $equipements = [
                ['name' => 'Grande table de reunion'],
                ['name' => 'Ecran de projection'],
                ['name' => 'Projecteur'],
                ['name' => 'Tableau blanc'],
                ['name' => 'Chaises confortables'],
                ['name' => 'Système de visioconférence'],
                ['name' => 'Microphone et haut-parleurs'],
                ['name' => 'Connexion Wi-Fi haut débit'],
                ['name' => 'Climatisation'],
                ['name' => 'Prises électriques à chaque poste']
        ];
        foreach ($equipements as $equipement) {
            \App\Models\Equipement::create($equipement);
        }
    }
}
