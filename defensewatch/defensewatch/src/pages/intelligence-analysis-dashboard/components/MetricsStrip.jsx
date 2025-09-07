import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsStrip = () => {
  const metrics = [
    {
      id: 'threat-trends',
      title: 'Threat Trend Indicators',
      value: '87.3%',
      change: '+12.4%',
      trend: 'up',
      sparklineData: [65, 72, 68, 75, 82, 87, 91, 85, 89, 87],
      status: 'warning',
      description: 'Weekly threat pattern analysis'
    },
    {
      id: 'pattern-accuracy',
      title: 'Pattern Recognition Accuracy',
      value: '94.7%',
      change: '+2.1%',
      trend: 'up',
      sparklineData: [88, 90, 92, 89, 93, 95, 94, 96, 95, 94],
      status: 'success',
      description: 'ML model classification precision'
    },
    {
      id: 'prediction-confidence',
      title: 'Prediction Confidence Score',
      value: '91.2%',
      change: '-1.8%',
      trend: 'down',
      sparklineData: [93, 94, 92, 95, 93, 91, 89, 92, 91, 91],
      status: 'success',
      description: 'Forecasting model reliability'
    },
    {
      id: 'anomaly-detection',
      title: 'Anomaly Detection Rate',
      value: '15.6%',
      change: '+5.2%',
      trend: 'up',
      sparklineData: [8, 12, 10, 14, 18, 16, 19, 17, 15, 16],
      status: 'error',
      description: 'Unusual pattern identification'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  const renderSparkline = (data) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data?.map((value, index) => {
      const x = (index / (data?.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 20;
      return `${x},${y}`;
    })?.join(' ');

    return (
      <svg width="60" height="20" className="opacity-60">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics?.map((metric) => (
        <div
          key={metric?.id}
          className="bg-card border border-border rounded-lg p-6 tactical-shadow hover:bg-muted/20 transition-tactical"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-muted-foreground font-mono uppercase tracking-wide">
                {metric?.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {metric?.description}
              </p>
            </div>
            <div className="ml-2">
              {renderSparkline(metric?.sparklineData)}
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className={`text-2xl font-bold font-mono ${getStatusColor(metric?.status)}`}>
                {metric?.value}
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <Icon
                  name={getTrendIcon(metric?.trend)}
                  size={14}
                  className={getTrendColor(metric?.trend)}
                />
                <span className={`text-sm font-medium font-mono ${getTrendColor(metric?.trend)}`}>
                  {metric?.change}
                </span>
              </div>
            </div>
            <div className={`w-2 h-2 rounded-full ${
              metric?.status === 'success' ? 'bg-success' :
              metric?.status === 'warning' ? 'bg-warning' :
              metric?.status === 'error' ? 'bg-error' : 'bg-muted'
            } pulse-alert`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsStrip;