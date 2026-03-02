<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Space;

class SpaceAdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_cannot_create_space()
    {
        $user = User::factory()->create([
            'role' => 'user'
        ]);

        /** @var \App\Models\User $user */
        $user = User::factory()->create();
        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/spaces', [
                'name' => 'Test Space',
                'surface' => 50,
                'capacity' => 10,
                'type' => 'bureau',
                'price_per_day' => 100,
                'is_active' => true
            ]);

        $response->assertStatus(403);
    }

    public function test_admin_can_create_space()
    {
        $admin = User::factory()->create([
            'role' => 'admin'
        ]);
        /** @var \App\Models\User $admin */
        $admin = User::factory()->create([
            'role' => 'admin'
        ]);
        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/spaces', [
                'name' => 'Admin Space',
                'surface' => 50,
                'capacity' => 10,
                'type' => 'bureau',
                'price_per_day' => 100,
                'is_active' => true
            ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('spaces', [
            'name' => 'Admin Space'
        ]);
    }

    public function test_admin_can_update_space()
    {
        $admin = User::factory()->create([
            'role' => 'admin'
        ]);

        $space = Space::factory()->create();

        /** @var \App\Models\User $admin */
        $admin = User::factory()->create([
            'role' => 'admin'
        ]);
        $response = $this->actingAs($admin, 'sanctum')
            ->putJson('/api/spaces/' . $space->id, [
                'name' => 'Updated Space'
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('spaces', [
            'id' => $space->id,
            'name' => 'Updated Space'
        ]);
    }

    public function test_admin_can_delete_space()
    {
        $admin = User::factory()->create([
            'role' => 'admin'
        ]);

        $space = Space::factory()->create();

                /** @var \App\Models\User $admin */
        $admin = User::factory()->create([
            'role' => 'admin'
        ]);
        $response = $this->actingAs($admin, 'sanctum')
            ->deleteJson('/api/spaces/' . $space->id);

        $response->assertStatus(200);

        $this->assertDatabaseMissing('spaces', [
            'id' => $space->id
        ]);
    }
}
