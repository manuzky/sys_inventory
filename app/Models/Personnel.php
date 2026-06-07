<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\PersonnelPositionHistory;

class Personnel extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'id_number',
        'email',
        'birth_date',
        'gender',
        'phone',
        'address',
        'status',
        'hire_date',
        'photo',
        'created_by',
        'updated_by',
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }

    protected $appends = ['full_name'];
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function positionsHistory()
    {
        return $this->hasMany(PersonnelPositionHistory::class, 'personnel_id');
    }
}
