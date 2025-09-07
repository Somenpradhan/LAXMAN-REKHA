import React from 'react';
import Select from '../../../components/ui/Select';

const ThreatLevelSelector = ({ value, onChange }) => {
  const threatLevels = [
    { value: 'all', label: 'All Threat Levels' },
    { value: 'critical', label: 'Critical (DEFCON 1)' },
    { value: 'high', label: 'High (DEFCON 2)' },
    { value: 'elevated', label: 'Elevated (DEFCON 3)' },
    { value: 'guarded', label: 'Guarded (DEFCON 4)' },
    { value: 'low', label: 'Low (DEFCON 5)' }
  ];

  return (
    <div className="w-full">
      <Select
        label="Threat Level Filter"
        options={threatLevels}
        value={value}
        onChange={onChange}
        placeholder="Select threat level"
        className="w-full"
      />
    </div>
  );
};

export default ThreatLevelSelector;