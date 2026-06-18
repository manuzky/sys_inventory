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
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }

    protected static function booted()
    {
        static::updated(function ($personnel) {

            $personnel->loadMissing('user');

            if (!$personnel->user) {
                return;
            }

            $changes = [];

            if ($personnel->wasChanged('email')) {
                $changes['email'] = $personnel->email;
            }

            if (
                $personnel->wasChanged('first_name') ||
                $personnel->wasChanged('last_name')
            ) {
                $changes['name'] = $personnel->full_name;
            }

            if (!empty($changes)) {
                $personnel->user->update($changes);
            }
        });
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
