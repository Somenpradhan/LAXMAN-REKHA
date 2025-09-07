import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const IncidentTimeline = () => {
  const [timeRange, setTimeRange] = useState('24h');
  
  const incidents = [
    {
      id: 'INC-2024-0829-001',
      type: 'Security Breach',
      severity: 'critical',
      timestamp: new Date('2024-08-29T16:45:00'),
      responseTime: 180,
      resolutionTime: 1200,
      status: 'resolved',
      slaTarget: 300,
      description: 'Unauthorized access attempt detected in Sector 12',
      assignedTeam: 'Alpha Response Unit'
    },
    {
      id: 'INC-2024-0829-002',
      type: 'System Malfunction',
      severity: 'high',
      timestamp: new Date('2024-08-29T15:30:00'),
      responseTime: 120,
      resolutionTime: 900,
      status: 'resolved',
      slaTarget: 600,
      description: 'Primary communication array experiencing intermittent failures',
      assignedTeam: 'Technical Support'
    },
    {
      id: 'INC-2024-0829-003',
      type: 'Weather Impact',
      severity: 'medium',
      timestamp: new Date('2024-08-29T14:15:00'),
      responseTime: 300,
      resolutionTime: 0,
      status: 'investigating',
      slaTarget: 1800,
      description: 'Heavy rainfall affecting radar visibility in Grid 7-C',
      assignedTeam: 'Operations Team B'
    },
    {
      id: 'INC-2024-0829-004',
      type: 'Equipment Check',
      severity: 'low',
      timestamp: new Date('2024-08-29T13:00:00'),
      responseTime: 60,
      resolutionTime: 300,
      status: 'resolved',
      slaTarget: 900,
      description: 'Routine maintenance completed on backup power systems',
      assignedTeam: 'Maintenance Crew'
    },
    {
      id: 'INC-2024-0829-005',
      type: 'False Alarm',
      severity: 'low',
      timestamp: new Date('2024-08-29T12:20:00'),
      responseTime: 90,
      resolutionTime: 180,
      status: 'resolved',
      slaTarget: 600,
      description: 'Bird strike triggered perimeter sensors - no threat detected',
      assignedTeam: 'Security Team'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-accent';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-success bg-success/10';
      case 'investigating': return 'text-warning bg-warning/10';
      case 'pending': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return 'CheckCircle';
      case 'investigating': return 'Clock';
      case 'pending': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds) => {
    if (seconds === 0) return '--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getSLAStatus = (responseTime, slaTarget) => {
    if (responseTime <= slaTarget) return 'within';
    if (responseTime <= slaTarget * 1.2) return 'warning';
    return 'exceeded';
  };

  const getSLAColor = (status) => {
    switch (status) {
      case 'within': return 'text-success';
      case 'warning': return 'text-warning';
      case 'exceeded': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const calculateMetrics = () => {
    const resolved = incidents?.filter(i => i?.status === 'resolved');
    const avgResponseTime = resolved?.reduce((sum, i) => sum + i?.responseTime, 0) / resolved?.length;
    const slaCompliance = (resolved?.filter(i => i?.responseTime <= i?.slaTarget)?.length / resolved?.length) * 100;
    
    return {
      avgResponseTime: Math.round(avgResponseTime),
      slaCompliance: Math.round(slaCompliance)
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="bg-card rounded-lg border border-border p-6 tactical-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold font-mono text-foreground">
          Incident Timeline & Performance
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-mono text-muted-foreground">Range:</span>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e?.target?.value)}
              className="bg-input border border-border rounded px-2 py-1 text-sm font-mono text-foreground"
            >
              <option value="1h">1 Hour</option>
              <option value="6h">6 Hours</option>
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
            </select>
          </div>
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/20 rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-accent" />
            <span className="text-sm font-mono text-muted-foreground uppercase">
              Avg Response Time
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-foreground">
            {formatDuration(metrics?.avgResponseTime)}
          </div>
        </div>

        <div className="bg-muted/20 rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-success" />
            <span className="text-sm font-mono text-muted-foreground uppercase">
              SLA Compliance
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-success">
            {metrics?.slaCompliance}%
          </div>
        </div>

        <div className="bg-muted/20 rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={16} className="text-warning" />
            <span className="text-sm font-mono text-muted-foreground uppercase">
              Active Incidents
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-warning">
            {incidents?.filter(i => i?.status !== 'resolved')?.length}
          </div>
        </div>
      </div>
      {/* Timeline */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {incidents?.map((incident, index) => {
          const slaStatus = getSLAStatus(incident?.responseTime, incident?.slaTarget);
          
          return (
            <div key={incident?.id} className="relative">
              {/* Timeline connector */}
              {index < incidents?.length - 1 && (
                <div className="absolute left-6 top-12 w-px h-8 bg-border"></div>
              )}
              <div className="flex items-start space-x-4 p-4 bg-muted/10 rounded-lg border border-border">
                {/* Status indicator */}
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-3 h-3 rounded-full ${getSeverityColor(incident?.severity)} bg-current`}></div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm text-foreground mb-1">
                        {incident?.type}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {incident?.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs font-mono text-muted-foreground">
                        <span>{incident?.id}</span>
                        <span>{formatTime(incident?.timestamp)}</span>
                        <span>{incident?.assignedTeam}</span>
                      </div>
                    </div>
                    
                    <div className={`px-2 py-1 rounded text-xs font-mono uppercase ${getStatusColor(incident?.status)}`}>
                      <Icon name={getStatusIcon(incident?.status)} size={12} className="inline mr-1" />
                      {incident?.status}
                    </div>
                  </div>

                  {/* Performance metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 pt-3 border-t border-border/50">
                    <div>
                      <div className="text-xs text-muted-foreground font-mono">Response</div>
                      <div className={`text-sm font-mono font-medium ${getSLAColor(slaStatus)}`}>
                        {formatDuration(incident?.responseTime)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-mono">Resolution</div>
                      <div className="text-sm font-mono font-medium text-foreground">
                        {formatDuration(incident?.resolutionTime)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-mono">SLA Target</div>
                      <div className="text-sm font-mono font-medium text-muted-foreground">
                        {formatDuration(incident?.slaTarget)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-mono">Severity</div>
                      <div className={`text-sm font-mono font-medium uppercase ${getSeverityColor(incident?.severity)}`}>
                        {incident?.severity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IncidentTimeline;