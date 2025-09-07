import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ 
  title, 
  value, 
  unit = '', 
  icon, 
  trend, 
  trendValue, 
  status = 'normal',
  description 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical':
        return 'border-error text-error';
      case 'warning':
        return 'border-warning text-warning';
      case 'success':
        return 'border-success text-success';
      default:
        return 'border-border text-foreground';
    }
  };

  const getTrendColor = () => {
    if (!trend) return 'text-muted-foreground';
    return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  };

  return (
    <div className={`
      bg-card rounded-lg border-2 p-4 tactical-shadow
      transition-tactical hover:bg-card/80
      ${getStatusColor()}
    `}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name={icon} size={20} className="text-primary" />
          <h3 className="text-sm font-medium text-muted-foreground font-mono uppercase tracking-wide">
            {title}
          </h3>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={14} />
            <span className="text-xs font-mono">{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline space-x-1 mb-2">
        <span className="text-2xl font-bold font-mono text-foreground">
          {value}
        </span>
        {unit && (
          <span className="text-sm text-muted-foreground font-mono">
            {unit}
          </span>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-muted-foreground font-mono">
          {description}
        </p>
      )}
    </div>
  );
};

export default KPICard;