<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonnelEmergencyContact extends Model
{
    protected $fillable = [
        'personnel_id',
        'relationship_id',
        'name',
        'phone',
        'secondary_phone',
    ];


    protected $casts = [
        'is_active' => 'boolean',
    ];


    public function relationship()
    {
        return $this->belongsTo(
            EmergencyContactRelationship::class,
            'relationship_id'
        );
    }
}