import React, { useState } from 'react';
import { Machine } from '../types';
import { Plus, ArrowUpDown, Search } from 'lucide-react';

interface MachineListProps {
  machines: Machine[];
  onMachineClick: (machine: Machine) => void;
  onAddMachine: () => void;
}

const MachineList: React.FC<MachineListProps> = ({ machines, onMachineClick, onAddMachine }) => {
  const [sortField, setSortField] = useState<keyof Machine | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMachines = machines.filter(machine =>
    machine.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.trackerSerialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.projectStock.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ('project' in machine.projectStock ? machine.projectStock.project.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
    ('location' in machine.projectStock ? machine.projectStock.location.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
    machine.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMachines = [...filteredMachines].sort((a, b) => {
    if (!sortField) return 0;
    if (sortField === 'projectStock') {
      const aValue = a.projectStock.type === 'Project' ? a.projectStock.project : a.projectStock.location;
      const bValue = b.projectStock.type === 'Project' ? b.projectStock.project : b.projectStock.location;
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof Machine) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
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
    <div>
      <div className="mb-4 flex items-center">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search machines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Serial Number</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('status')}>
                Status <ArrowUpDown className="inline-block w-4 h-4" />
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('projectStock')}>
                Project/Stock <ArrowUpDown className="inline-block w-4 h-4" />
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('version')}>
                Version <ArrowUpDown className="inline-block w-4 h-4" />
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sortedMachines.map((machine) => (
              <tr key={machine.serialNumber} className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer" onClick={() => onMachineClick(machine)}>
                <td className="py-3 px-6 text-left whitespace-nowrap">{machine.serialNumber}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`${getStatusColor(machine.status)} text-gray-600 py-1 px-3 rounded-full text-xs`}>
                    {machine.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  {machine.projectStock.type === 'Project' ? `Project: ${machine.projectStock.project}` : `Stock: ${machine.projectStock.location}`}
                </td>
                <td className="py-3 px-6 text-left">{machine.version}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        onClick={onAddMachine}
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default MachineList;