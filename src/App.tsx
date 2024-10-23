import React, { useState, useEffect } from 'react';
import MachineList from './components/MachineList';
import MachineDetail from './components/MachineDetail';
import MachineOverview from './components/MachineOverview';
import Login from './components/Login';
import { Machine } from './types';

function App() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/machines');
      const data = await response.json();
      setMachines(data);
    } catch (error) {
      console.error('Error fetching machines:', error);
    }
  };

  const handleLogin = (username: string) => {
    setUser(username);
  };

  const handleMachineClick = (machine: Machine) => {
    setSelectedMachine(machine);
  };

  const handleSaveMachine = async (updatedMachine: Machine) => {
    try {
      const response = await fetch(`http://localhost:5000/api/machines/${updatedMachine._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMachine),
      });
      const savedMachine = await response.json();
      setMachines(machines.map(m => m._id === savedMachine._id ? savedMachine : m));
      setSelectedMachine(null);
    } catch (error) {
      console.error('Error saving machine:', error);
    }
  };

  const handleAddMachine = async () => {
    const newMachine: Omit<Machine, '_id'> = {
      serialNumber: `DDT${String(machines.length + 1).padStart(3, '0')}`,
      trackerSerialNumber: `TRK${String(machines.length + 1).padStart(3, '0')}`,
      projectStock: { type: 'Stock', location: 'Enschede' },
      version: 'Europe',
      status: 'Not yet tested',
      notes: [],
      dateLeft: '',
      dateReturn: '',
    };

    try {
      const response = await fetch('http://localhost:5000/api/machines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMachine),
      });
      const addedMachine = await response.json();
      setMachines([...machines, addedMachine]);
      setSelectedMachine(addedMachine);
    } catch (error) {
      console.error('Error adding machine:', error);
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">DDT Machine Management</h1>
      <MachineOverview machines={machines} />
      <MachineList 
        machines={machines} 
        onMachineClick={handleMachineClick}
        onAddMachine={handleAddMachine}
      />
      {selectedMachine && (
        <MachineDetail 
          machine={selectedMachine} 
          onSave={handleSaveMachine}
          onClose={() => setSelectedMachine(null)}
        />
      )}
    </div>
  );
}

export default App;