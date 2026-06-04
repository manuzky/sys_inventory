<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonnelPositionHistory extends Model
{
    protected $fillable = [
        'personnel_id',
        'position_id',
        'start_date',
        'end_date',
        'assigned_by',
    ];

    public function personnel()
    {
        return $this->belongsTo(Personnel::class);
    }

    public function position()
    {
        return $this->belongsTo(Position::class);
    }
}