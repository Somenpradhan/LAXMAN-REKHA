import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertQueue = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 'ALT-001',
      severity: 'critical',
      type: 'Unauthorized Aircraft',
      location: 'Sector 7-Alpha',
      timestamp: new Date(Date.now() - 300000),
      escalationTimer: 180,
      status: 'pending',
      description: 'Unidentified aircraft detected in restricted airspace'
    },
    {
      id: 'ALT-002',
      severity: 'high',
      type: 'Radar Anomaly',
      location: 'Station Beta-2',
      timestamp: new Date(Date.now() - 600000),
      escalationTimer: 420,
      status: 'acknowledged',
      description: 'Primary radar showing intermittent signal loss'
    },
    {
      id: 'ALT-003',
      severity: 'medium',
      type: 'Weather Alert',
      location: 'Grid 12-C',
      timestamp: new Date(Date.now() - 900000),
      escalationTimer: 600,
      status: 'investigating',
      description: 'Severe weather conditions affecting visibility'
    },
    {
      id: 'ALT-004',
      severity: 'low',
      type: 'System Maintenance',
      location: 'Control Room A',
      timestamp: new Date(Date.now() - 1200000),
      escalationTimer: 0,
      status: 'resolved',
      description: 'Scheduled maintenance completed successfully'
    }
  ]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error border-error/20 bg-error/5';
      case 'high': return 'text-warning border-warning/20 bg-warning/5';
      case 'medium': return 'text-accent border-accent/20 bg-accent/5';
      case 'low': return 'text-success border-success/20 bg-success/5';
      default: return 'text-muted-foreground border-border bg-muted/5';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-error';
      case 'acknowledged': return 'text-warning';
      case 'investigating': return 'text-accent';
      case 'resolved': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatTimer = (seconds) => {
    if (seconds <= 0) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleAcknowledge = (alertId) => {
    setAlerts(prev => prev?.map(alert => 
      alert?.id === alertId 
        ? { ...alert, status: 'acknowledged' }
        : alert
    ));
  };

  const handleAssign = (alertId) => {
    setAlerts(prev => prev?.map(alert => 
      alert?.id === alertId 
        ? { ...alert, status: 'investigating' }
        : alert
    ));
  };

  const handleResolve = (alertId) => {
    setAlerts(prev => prev?.map(alert => 
      alert?.id === alertId 
        ? { ...alert, status: 'resolved', escalationTimer: 0 }
        : alert
    ));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 tactical-shadow h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold font-mono text-foreground">
          Live Alert Queue
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
          <span className="text-sm font-mono text-error">
            {alerts?.filter(a => a?.status === 'pending')?.length} PENDING
          </span>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts?.map((alert) => (
          <div 
            key={alert?.id} 
            className={`p-3 rounded-lg border transition-tactical ${getSeverityColor(alert?.severity)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name={getSeverityIcon(alert?.severity)} size={16} className="text-current" />
                <div>
                  <span className="font-mono text-sm font-medium text-current">
                    {alert?.id}
                  </span>
                  <span className={`ml-2 text-xs font-mono uppercase ${getStatusColor(alert?.status)}`}>
                    {alert?.status}
                  </span>
                </div>
              </div>
              {alert?.escalationTimer > 0 && (
                <div className="text-right">
                  <div className="text-xs text-muted-foreground font-mono">
                    Auto-escalate in
                  </div>
                  <div className="text-sm font-mono font-bold text-warning">
                    {formatTimer(alert?.escalationTimer)}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-2">
              <h4 className="font-medium text-sm text-foreground mb-1">
                {alert?.type}
              </h4>
              <p className="text-xs text-muted-foreground mb-1">
                {alert?.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span>{alert?.location}</span>
                <span>{formatTime(alert?.timestamp)}</span>
              </div>
            </div>

            {alert?.status !== 'resolved' && (
              <div className="flex items-center space-x-2 pt-2 border-t border-border/50">
                {alert?.status === 'pending' && (
                  <>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleAcknowledge(alert?.id)}
                      iconName="Check"
                      iconPosition="left"
                    >
                      ACK
                    </Button>
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => handleAssign(alert?.id)}
                      iconName="User"
                      iconPosition="left"
                    >
                      Assign
                    </Button>
                  </>
                )}
                {(alert?.status === 'acknowledged' || alert?.status === 'investigating') && (
                  <Button
                    variant="success"
                    size="xs"
                    onClick={() => handleResolve(alert?.id)}
                    iconName="CheckCircle"
                    iconPosition="left"
                  >
                    Resolve
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="MessageSquare"
                  iconPosition="left"
                >
                  Comm
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold font-mono text-error">
              {alerts?.filter(a => a?.severity === 'critical')?.length}
            </div>
            <div className="text-xs text-muted-foreground font-mono uppercase">
              Critical
            </div>
          </div>
          <div>
            <div className="text-lg font-bold font-mono text-warning">
              {alerts?.filter(a => a?.severity === 'high')?.length}
            </div>
            <div className="text-xs text-muted-foreground font-mono uppercase">
              High Priority
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertQueue;