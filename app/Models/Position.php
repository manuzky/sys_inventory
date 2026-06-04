<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $fillable = [
        'name',
        'description',
        'active',
        'created_by',
        'updated_by',
    ];

    public function personnelHistories()
    {
        return $this->hasMany(PersonnelPositionHistory::class);
    }
}
