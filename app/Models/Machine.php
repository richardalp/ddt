<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Machine extends Model
{
    protected $fillable = [
        'serial_number',
        'tracker_serial_number',
        'project_stock_type',
        'project_stock_value',
        'version',
        'status',
        'date_left',
        'date_return',
    ];

    protected $casts = [
        'date_left' => 'date',
        'date_return' => 'date',
    ];

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }
}