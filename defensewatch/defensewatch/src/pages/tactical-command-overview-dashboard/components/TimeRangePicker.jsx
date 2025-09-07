import React from 'react';
import Select from '../../../components/ui/Select';

const TimeRangePicker = ({ value, onChange }) => {
  const timeRanges = [
    { value: '30min', label: 'Last 30 minutes' },
    { value: '1hr', label: 'Last 1 hour' },
    { value: '2hr', label: 'Last 2 hours' },
    { value: '6hr', label: 'Last 6 hours' },
    { value: '12hr', label: 'Last 12 hours' },
    { value: '24hr', label: 'Last 24 hours' }
  ];

  return (
    <div className="w-full">
      <Select
        label="Time Range"
        options={timeRanges}
        value={value}
        onChange={onChange}
        placeholder="Select time range"
        className="w-full"
      />
    </div>
  );
};

export default TimeRangePicker;