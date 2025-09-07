import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterControls = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    region: 'all',
    threatTypes: [],
    confidenceLevel: 'medium',
    timeComparison: 'week'
  });

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north', label: 'Northern Sector' },
    { value: 'south', label: 'Southern Sector' },
    { value: 'east', label: 'Eastern Sector' },
    { value: 'west', label: 'Western Sector' },
    { value: 'central', label: 'Central Command' }
  ];

  const threatTypeOptions = [
    { value: 'aerial', label: 'Aerial Threats' },
    { value: 'naval', label: 'Naval Threats' },
    { value: 'ground', label: 'Ground Forces' },
    { value: 'cyber', label: 'Cyber Attacks' },
    { value: 'missile', label: 'Missile Systems' },
    { value: 'drone', label: 'Drone Activity' }
  ];

  const confidenceLevelOptions = [
    { value: 'low', label: 'Low (>60%)' },
    { value: 'medium', label: 'Medium (>80%)' },
    { value: 'high', label: 'High (>95%)' }
  ];

  const timeComparisonOptions = [
    { value: 'week', label: 'Week-over-Week' },
    { value: 'month', label: 'Month-over-Month' },
    { value: 'year', label: 'Year-over-Year' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      region: 'all',
      threatTypes: [],
      confidenceLevel: 'medium',
      timeComparison: 'week'
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const exportData = () => {
    // Mock export functionality
    console.log('Exporting analytical data with filters:', filters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-mono">
            Advanced Analysis Filters
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button
            variant="secondary"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={exportData}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Select
            label="Geographic Region"
            options={regionOptions}
            value={filters?.region}
            onChange={(value) => handleFilterChange('region', value)}
            className="w-full"
          />
        </div>

        <div>
          <Select
            label="Threat Types"
            options={threatTypeOptions}
            value={filters?.threatTypes}
            onChange={(value) => handleFilterChange('threatTypes', value)}
            multiple
            searchable
            clearable
            placeholder="Select threat types..."
            className="w-full"
          />
        </div>

        <div>
          <Select
            label="Confidence Level"
            options={confidenceLevelOptions}
            value={filters?.confidenceLevel}
            onChange={(value) => handleFilterChange('confidenceLevel', value)}
            className="w-full"
          />
        </div>

        <div>
          <Select
            label="Historical Comparison"
            options={timeComparisonOptions}
            value={filters?.timeComparison}
            onChange={(value) => handleFilterChange('timeComparison', value)}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground font-mono">
          <span>Last Updated: 29/08/2025 18:16</span>
          <span>•</span>
          <span>Auto-refresh: 5 min</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="RefreshCw"
          iconPosition="left"
        >
          Manual Refresh
        </Button>
      </div>
    </div>
  );
};

export default FilterControls;