<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('categories')->insert([
            ['name' => 'sport','description'=>'This is Sport Section'],
            ['name' => 'local','description'=>'This is Local Section'],
            ['name' => 'international','description'=>'This is International Section'],
            ['name' => 'animal','description'=>'This is Animal Section'],
            ['name' => 'health','description'=>'This is Health Section'],
        ]);
    }
}
