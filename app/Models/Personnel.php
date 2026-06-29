<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\PersonnelPositionHistory;

class Personnel extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',

        // Documento
        'document_type',
        'id_number',

        // Correo
        'email',

        // Datos personales
        'birth_date',
        'gender',
        'marital_status',

        // Contacto
        'phone',
        'secondary_phone',
        'address',

        // Laboral
        'hire_date',
        'status',

        // Archivos
        'photo',
        'curriculum',
    ];

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

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function positionsHistory()
    {
        return $this->hasMany(PersonnelPositionHistory::class, 'personnel_id');
    }
}