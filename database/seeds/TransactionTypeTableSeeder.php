<?php

use Illuminate\Database\Seeder;
use App\TransactionType;

class TransactionTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TransactionType::create([
        	'code' => 'DP',
        	'description' => 'Deposit',
        	'is_deduct' => false
        ]);

        TransactionType::create([
        	'code' => 'DV',
        	'description' => 'Dividend',
        	'is_deduct' => false
        ]);

        TransactionType::create([
        	'code' => 'WD',
        	'description' => 'Withdraw',
        	'is_deduct' => true
        ]);

        TransactionType::create([
        	'code' => 'MF',
        	'description' => 'Membership Fee',
        	'is_deduct' => true
        ]);
    }
}
