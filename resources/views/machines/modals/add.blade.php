<div class="modal fade" id="addMachineModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add New Machine</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <form id="add_machine_form" action="{{ route('machines.store') }}" method="POST">
                @csrf
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="serial_number" class="form-label">Serial Number</label>
                        <input type="text" class="form-control" id="serial_number" name="serial_number" required>
                    </div>
                    <div class="mb-3">
                        <label for="tracker_serial_number" class="form-label">Tracker Serial Number</label>
                        <input type="text" class="form-control" id="tracker_serial_number" name="tracker_serial_number" required>
                    </div>
                    <div class="mb-3">
                        <label for="project_stock_type" class="form-label">Project/Stock</label>
                        <select class="form-select" id="project_stock_type" name="project_stock_type" required>
                            <option value="Project">Project</option>
                            <option value="Stock">Stock</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="project_stock_value" class="form-label">Location/Project Name</label>
                        <input type="text" class="form-control" id="project_stock_value" name="project_stock_value" required>
                    </div>
                    <div class="mb-3">
                        <label for="version" class="form-label">Version</label>
                        <select class="form-select" id="version" name="version" required>
                            <option value="Europe">Europe</option>
                            <option value="Brazil">Brazil</option>
                            <option value="USA Inc">USA Inc</option>
                            <option value="USA LLC">USA LLC</option>
                            <option value="UK">UK</option>
                            <option value="Angola">Angola</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="status" class="form-label">Status</label>
                        <select class="form-select" id="status" name="status" required>
                            <option value="Tested and operational">Tested and operational</option>
                            <option value="Needs repair">Needs repair</option>
                            <option value="Not yet tested">Not yet tested</option>
                            <option value="Under maintenance">Under maintenance</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Machine</button>
                </div>
            </form>
        </div>
    </div>
</div>