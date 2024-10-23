import React from 'react';
import { Machine } from '../types';

interface MachineOverviewProps {
  machines: Machine[];
}

const MachineOverview: React.FC<MachineOverviewProps> = ({ machines }) => {
  const statusCounts = machines.reduce((acc, machine) => {
    acc[machine.status] = (acc[machine.status] || 0) + 1;
    return acc;
  }, {} as Record<Machine['status'], number>);

  const projectStockCounts = machines.reduce((acc, machine) => {
    acc[machine.projectStock.type] = (acc[machine.projectStock.type] || 0) + 1;
    return acc;
  }, {} as Record<'Project' | 'Stock', number>);

  const versionCounts = machines.reduce((acc, machine) => {
    acc[machine.version] = (acc[machine.version] || 0) + 1;
    return acc;
  }, {} as Record<Machine['version'], number>);

  const repairedPartsCounts = machines.reduce((acc, machine) => {
    machine.notes.forEach(note => {
      note.parts.forEach(part => {
        acc[part] = (acc[part] || 0) + 1;
      });
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Machine Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Status</h3>
          <ul>
            {Object.entries(statusCounts).map(([status, count]) => (
              <li key={status} className="text-sm">
                {status}: {count}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Project/Stock</h3>
          <ul>
            <li className="text-sm">Project: {projectStockCounts.Project || 0}</li>
            <li className="text-sm">Stock: {projectStockCounts.Stock || 0}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Version</h3>
          <ul>
            {Object.entries(versionCounts).map(([version, count]) => (
              <li key={version} className="text-sm">
                {version}: {count}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Repaired Parts</h3>
          <ul>
            {Object.entries(repairedPartsCounts).map(([part, count]) => (
              <li key={part} className="text-sm">
                {part}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MachineOverview;