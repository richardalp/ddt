<?php

namespace App\Http\Controllers;

use App\Models\Machine;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MachineController extends Controller
{
    public function index()
    {
        $machines = Machine::with('notes')->get();
        
        $statusCounts = $machines->groupBy('status')
            ->map->count();
            
        $projectStockCounts = $machines->groupBy('project_stock_type')
            ->map->count();
            
        $versionCounts = $machines->groupBy('version')
            ->map->count();
            
        $repairedPartsCounts = Note::whereNotNull('parts')
            ->get()
            ->pluck('parts')
            ->flatten()
            ->countBy();

        return view('machines.index', compact(
            'machines',
            'statusCounts',
            'projectStockCounts',
            'versionCounts',
            'repairedPartsCounts'
        ));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'serial_number' => 'required|unique:machines',
            'tracker_serial_number' => 'required',
            'project_stock_type' => 'required|in:Project,Stock',
            'project_stock_value' => 'required',
            'version' => 'required',
            'status' => 'required',
        ]);

        $machine = Machine::create($validated);

        return redirect()->route('machines.index')
            ->with('success', 'Machine created successfully.');
    }

    public function show(Machine $machine)
    {
        return response()->json($machine->load('notes'));
    }

    public function update(Request $request, Machine $machine)
    {
        $validated = $request->validate([
            'serial_number' => 'required|unique:machines,serial_number,' . $machine->id,
            'tracker_serial_number' => 'required',
            'project_stock_type' => 'required|in:Project,Stock',
            'project_stock_value' => 'required',
            'version' => 'required',
            'status' => 'required',
        ]);

        $machine->update($validated);

        return redirect()->route('machines.index')
            ->with('success', 'Machine updated successfully.');
    }

    public function destroy(Machine $machine)
    {
        $machine->delete();

        return response()->json(['message' => 'Machine deleted successfully']);
    }
}