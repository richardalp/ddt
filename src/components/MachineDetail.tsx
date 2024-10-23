import React, { useState } from 'react';
import { Machine, versionSpecs, ProjectStock } from '../types';

interface MachineDetailProps {
  machine: Machine;
  onSave: (updatedMachine: Machine) => void;
  onClose: () => void;
}

const MachineDetail: React.FC<MachineDetailProps> = ({ machine, onSave, onClose }) => {
  const [editedMachine, setEditedMachine] = useState<Machine>({ ...machine });
  const [newNote, setNewNote] = useState('');
  const [selectedParts, setSelectedParts] = useState<('Sensor' | 'Circuit board' | 'Fan')[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedMachine((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectStockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let newProjectStock: ProjectStock;

    if (value === 'Project') {
      newProjectStock = { type: 'Project', project: '' };
    } else {
      newProjectStock = { type: 'Stock', location: value as 'Enschede' | 'Houston' | 'Macaé' };
    }

    setEditedMachine((prev) => ({ ...prev, projectStock: newProjectStock }));
  };

  const handleProjectInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditedMachine((prev) => ({
      ...prev,
      projectStock: { type: 'Project', project: value },
    }));
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const currentDate = new Date().toISOString().split('T')[0];
      setEditedMachine((prev) => ({
        ...prev,
        notes: [...prev.notes, { date: currentDate, text: newNote.trim(), parts: selectedParts }],
      }));
      setNewNote('');
      setSelectedParts([]);
    }
  };

  const handlePartToggle = (part: 'Sensor' | 'Circuit board' | 'Fan') => {
    setSelectedParts((prev) =>
      prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part]
    );
  };

  const handleSave = () => {
    onSave(editedMachine);
  };

  const getStatusColor = (status: Machine['status']) => {
    switch (status) {
      case 'Tested and operational': return 'bg-green-200';
      case 'Needs repair': return 'bg-orange-200';
      case 'Not yet tested': return 'bg-yellow-200';
      case 'Under maintenance': return 'bg-red-200';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Machine Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Serial Number</label>
            <input
              type="text"
              name="serialNumber"
              value={editedMachine.serialNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tracker Serial Number</label>
            <input
              type="text"
              name="trackerSerialNumber"
              value={editedMachine.trackerSerialNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Project/Stock</label>
            <select
              name="projectStock"
              value={editedMachine.projectStock.type === 'Project' ? 'Project' : editedMachine.projectStock.location}
              onChange={handleProjectStockChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="Project">Project</option>
              <option value="Enschede">Stock: Enschede</option>
              <option value="Houston">Stock: Houston</option>
              <option value="Macaé">Stock: Macaé</option>
            </select>
          </div>
          {editedMachine.projectStock.type === 'Project' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                value={editedMachine.projectStock.project}
                onChange={handleProjectInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Version</label>
            <select
              name="version"
              value={editedMachine.version}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {Object.keys(versionSpecs).map((version) => (
                <option key={version} value={version}>{version}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Electrical Specifications</label>
          <p className="mt-1 text-sm text-gray-600">
            {versionSpecs[editedMachine.version].volt} volt, {versionSpecs[editedMachine.version].hz} Hz, {versionSpecs[editedMachine.version].amp} amp
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Left</label>
            <input
              type="date"
              name="dateLeft"
              value={editedMachine.dateLeft}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Return</label>
            <input
              type="date"
              name="dateReturn"
              value={editedMachine.dateReturn}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={editedMachine.status}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${getStatusColor(editedMachine.status)}`}
          >
            <option value="Tested and operational">Tested and operational</option>
            <option value="Needs repair">Needs repair</option>
            <option value="Not yet tested">Not yet tested</option>
            <option value="Under maintenance">Under maintenance</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <ul className="mt-1 text-sm text-gray-600 max-h-40 overflow-y-auto">
            {editedMachine.notes.map((note, index) => (
              <li key={index} className="mb-1">
                {note.date} - {note.text}
                {note.parts.length > 0 && (
                  <span className="ml-2">
                    (Parts: {note.parts.join(', ')})
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Add a new note..."
            />
            <div className="mt-2 flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedParts.includes('Sensor')}
                  onChange={() => handlePartToggle('Sensor')}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Sensor</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedParts.includes('Circuit board')}
                  onChange={() => handlePartToggle('Circuit board')}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Circuit board</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedParts.includes('Fan')}
                  onChange={() => handlePartToggle('Fan')}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Fan</span>
              </label>
            </div>
            <button
              onClick={handleAddNote}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Note
            </button>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MachineDetail;