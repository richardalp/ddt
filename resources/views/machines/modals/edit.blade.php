<div class="modal fade" id="editMachineModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Machine</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <form id="edit_machine_form" method="POST">
                @csrf
                @method('PUT')
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="edit_serial_number" class="form-label">Serial Number</label>
                        <input type="text" class="form-control" id="edit_serial_number" name="serial_number" required>
                    </div>
                    <div class="mb-3">
                        <label for="edit_tracker_serial_number" class="form-label">Tracker Serial Number</label>
                        <input type="text" class="form-control" id="edit_tracker_serial_number" name="tracker_serial_number" required>
                    </div>
                    <div class="mb-3">
                        <label for="edit_project_stock_type" class="form-label">Project/Stock</label>
                        <select class="form-select" id="edit_project_stock_type" name="project_stock_type" required>
                            <option value="Project">Project</option>
                            <option value="Stock">Stock</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="edit_project_stock_value" class="form-label">Location/Project Name</label>
                        <input type="text" class="form-control" id="edit_project_stock_value" name="project_stock_value" required>
                    </div>
                    <div class="mb-3">
                        <label for="edit_version" class="form-label">Version</label>
                        <select class="form-select" id="edit_version" name="version" required>
                            <option value="Europe">Europe</option>
                            <option value="Brazil">Brazil</option>
                            <option value="USA Inc">USA Inc</option>
                            <option value="USA LLC">USA LLC</option>
                            <option value="UK">UK</option>
                            <option value="Angola">Angola</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="edit_status" class="form-label">Status</label>
                        <select class="form-select" id="edit_status" name="status" required>
                            <option value="Tested and operational">Tested and operational</option>
                            <option value="Needs repair">Needs repair</option>
                            <option value="Not yet tested">Not yet tested</option>
                            <option value="Under maintenance">Under maintenance</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
</div>