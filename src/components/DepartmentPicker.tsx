
import React from 'react';
import { Folder } from 'lucide-react';

const departments = [
  { id: 'scope', name: 'SCOPE', color: 'dept-scope' },
  { id: 'sense', name: 'SENSE', color: 'dept-sense' },
  { id: 'spec', name: 'SPEC', color: 'dept-spec' },
  { id: 'select', name: 'SELECT', color: 'dept-select' },
  { id: 'vitbs', name: 'VITBS', color: 'dept-vitbs' },
  { id: 'vitsob', name: 'VITSOB', color: 'dept-vitsob' },
  { id: 'cdoe', name: 'CDOE', color: 'dept-cdoe' },
  { id: 'ssl', name: 'SSL', color: 'dept-ssl' }
];

interface DepartmentPickerProps {
  selectedDepartment: string | null;
  onSelectDepartment: (department: string | null) => void;
}

export const DepartmentPicker: React.FC<DepartmentPickerProps> = ({
  selectedDepartment,
  onSelectDepartment
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">
        Choose Your Department
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {departments.map((dept) => (
          <div
            key={dept.id}
            onClick={() => onSelectDepartment(
              selectedDepartment === dept.id ? null : dept.id
            )}
            className={`
              brutalist-card cursor-pointer text-center relative
              ${selectedDepartment === dept.id ? 'ring-4 ring-yellow-400' : ''}
            `}
          >
            {selectedDepartment === dept.id && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-black"></div>
            )}
            <div className={`${dept.color} p-4 rounded-lg mb-3 mx-auto w-16 h-16 flex items-center justify-center`}>
              <Folder className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wider">{dept.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
