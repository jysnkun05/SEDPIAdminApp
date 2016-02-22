<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
        	'name' => 'Super Admin',
        	'username' => 'root',
        	'email' => 'jysndlsrys05@gmail.com',
        	'password' => bcrypt('sedpi2004'),
        	'role_id' => App\Role::where('name', 'Administrator')->first()->id
        ]);
    }
}
