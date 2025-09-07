import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusCard = ({ title, value, unit, status, icon, trend, description, lastUpdate }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'operational':
        return 'text-success border-success/20 bg-success/5';
      case 'warning':
        return 'text-warning border-warning/20 bg-warning/5';
      case 'critical':
        return 'text-error border-error/20 bg-error/5';
      case 'offline':
        return 'text-muted-foreground border-border bg-muted/5';
      default:
        return 'text-foreground border-border bg-card';
    }
  };

  const getTrendIcon = () => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className={`p-4 rounded-lg border tactical-shadow transition-tactical ${getStatusColor()}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name={icon} size={20} className="text-current" />
          <h3 className="font-medium text-sm font-mono uppercase tracking-wide">
            {title}
          </h3>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name={getTrendIcon()} size={14} className={getTrendColor()} />
          <span className={`text-xs font-mono ${getTrendColor()}`}>
            {Math.abs(trend)}%
          </span>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold font-mono text-current">
            {value}
          </span>
          {unit && (
            <span className="text-sm text-muted-foreground font-mono">
              {unit}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>Last Update:</span>
          <span>{lastUpdate}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;