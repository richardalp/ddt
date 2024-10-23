@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row mb-4">
        <div class="col">
            <h2 class="mb-4">Machine Overview</h2>
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <h5>Status</h5>
                            <ul class="list-unstyled">
                                @foreach($statusCounts as $status => $count)
                                    <li>{{ $status }}: {{ $count }}</li>
                                @endforeach
                            </ul>
                        </div>
                        <div class="col-md-3">
                            <h5>Project/Stock</h5>
                            <ul class="list-unstyled">
                                <li>Project: {{ $projectStockCounts['Project'] ?? 0 }}</li>
                                <li>Stock: {{ $projectStockCounts['Stock'] ?? 0 }}</li>
                            </ul>
                        </div>
                        <div class="col-md-3">
                            <h5>Version</h5>
                            <ul class="list-unstyled">
                                @foreach($versionCounts as $version => $count)
                                    <li>{{ $version }}: {{ $count }}</li>
                                @endforeach
                            </ul>
                        </div>
                        <div class="col-md-3">
                            <h5>Repaired Parts</h5>
                            <ul class="list-unstyled">
                                @foreach($repairedPartsCounts as $part => $count)
                                    <li>{{ $part }}: {{ $count }}</li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h2>Machines</h2>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addMachineModal">
                    Add Machine
                </button>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Serial Number</th>
                                    <th>Status</th>
                                    <th>Project/Stock</th>
                                    <th>Version</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($machines as $machine)
                                    <tr>
                                        <td>{{ $machine->serial_number }}</td>
                                        <td>
                                            <span class="machine-status status-{{ strtolower(str_replace(' ', '-', $machine->status)) }}">
                                                {{ $machine->status }}
                                            </span>
                                        </td>
                                        <td>
                                            {{ $machine->project_stock_type }}: 
                                            {{ $machine->project_stock_value }}
                                        </td>
                                        <td>{{ $machine->version }}</td>
                                        <td>
                                            <button class="btn btn-sm btn-primary me-2" 
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#editMachineModal" 
                                                    data-machine-id="{{ $machine->id }}">
                                                Edit
                                            </button>
                                            <button class="btn btn-sm btn-danger delete-machine" 
                                                    data-machine-id="{{ $machine->id }}">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@include('machines.modals.add')
@include('machines.modals.edit')
@endsection

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize delete buttons
        document.querySelectorAll('.delete-machine').forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this machine?')) {
                    const machineId = this.dataset.machineId;
                    fetch(`/machines/${machineId}`, {
                        method: 'DELETE',
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            window.location.reload();
                        }
                    });
                }
            });
        });

        // Initialize edit modal
        const editModal = document.getElementById('editMachineModal');
        editModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const machineId = button.dataset.machineId;
            
            fetch(`/machines/${machineId}`)
                .then(response => response.json())
                .then(machine => {
                    editModal.querySelector('#edit_serial_number').value = machine.serial_number;
                    editModal.querySelector('#edit_tracker_serial_number').value = machine.tracker_serial_number;
                    editModal.querySelector('#edit_project_stock_type').value = machine.project_stock_type;
                    editModal.querySelector('#edit_project_stock_value').value = machine.project_stock_value;
                    editModal.querySelector('#edit_version').value = machine.version;
                    editModal.querySelector('#edit_status').value = machine.status;
                    editModal.querySelector('#edit_machine_form').dataset.machineId = machineId;
                });
        });
    });
</script>
@endpush