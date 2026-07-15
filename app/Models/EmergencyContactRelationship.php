<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmergencyContactRelationship extends Model
{
    protected $fillable = [
        'name',
    ];


    public function contacts()
    {
        return $this->hasMany(
            PersonnelEmergencyContact::class,
            'relationship_id'
        );
    }
}