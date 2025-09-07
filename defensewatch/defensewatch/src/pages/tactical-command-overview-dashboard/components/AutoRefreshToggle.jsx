import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AutoRefreshToggle = ({ isEnabled, onToggle, interval = 30 }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-foreground">Auto Refresh</label>
      <div className="flex items-center space-x-2">
        <Button
          variant={isEnabled ? "default" : "outline"}
          size="sm"
          onClick={onToggle}
          iconName={isEnabled ? "Pause" : "Play"}
          iconPosition="left"
          className="min-w-[120px]"
        >
          {isEnabled ? `ON (${interval}s)` : 'OFF'}
        </Button>
        {isEnabled && (
          <div className="flex items-center space-x-1 text-xs text-success">
            <Icon name="Wifi" size={12} />
            <span>Live</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoRefreshToggle;