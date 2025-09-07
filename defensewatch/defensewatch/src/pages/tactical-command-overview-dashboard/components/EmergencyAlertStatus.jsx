import React from 'react';
import Icon from '../../../components/AppIcon';

const EmergencyAlertStatus = ({ status, alertCount = 0 }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'critical':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error',
          icon: 'AlertTriangle',
          label: 'CRITICAL ALERT',
          pulse: true
        };
      case 'warning':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning',
          icon: 'AlertCircle',
          label: 'WARNING',
          pulse: false
        };
      case 'normal':
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success',
          icon: 'Shield',
          label: 'NORMAL',
          pulse: false
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          borderColor: 'border-muted',
          icon: 'Info',
          label: 'UNKNOWN',
          pulse: false
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`
      flex items-center space-x-3 p-3 rounded-lg border-2
      ${config?.bgColor} ${config?.borderColor}
      ${config?.pulse ? 'pulse-alert' : ''}
    `}>
      <Icon 
        name={config?.icon} 
        size={20} 
        className={config?.color}
      />
      <div className="flex flex-col">
        <span className={`text-sm font-bold font-mono ${config?.color}`}>
          {config?.label}
        </span>
        {alertCount > 0 && (
          <span className="text-xs text-muted-foreground font-mono">
            {alertCount} active alert{alertCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
};

export default EmergencyAlertStatus;