export interface Machine {
  _id: string;
  serialNumber: string;
  trackerSerialNumber: string;
  projectStock: ProjectStock;
  version: 'Brazil' | 'USA Inc' | 'USA LLC' | 'Europe' | 'Angola' | 'UK';
  status: 'Tested and operational' | 'Needs repair' | 'Not yet tested' | 'Under maintenance';
  notes: Note[];
  dateLeft: string;
  dateReturn: string;
}

export interface Note {
  date: string;
  text: string;
  parts: ('Sensor' | 'Circuit board' | 'Fan')[];
}

export type ProjectStock = 
  | { type: 'Project'; project: string }
  | { type: 'Stock'; location: 'Enschede' | 'Houston' | 'Macaé' };

export interface ElectricalSpecs {
  volt: number;
  hz: number;
  amp: number;
}

export const versionSpecs: Record<Machine['version'], ElectricalSpecs> = {
  Europe: { volt: 230, hz: 50, amp: 16 },
  Brazil: { volt: 230, hz: 60, amp: 16 },
  'USA Inc': { volt: 115, hz: 60, amp: 20 },
  'USA LLC': { volt: 115, hz: 60, amp: 20 },
  UK: { volt: 115, hz: 50, amp: 16 },
  Angola: { volt: 230, hz: 50, amp: 16 },
};