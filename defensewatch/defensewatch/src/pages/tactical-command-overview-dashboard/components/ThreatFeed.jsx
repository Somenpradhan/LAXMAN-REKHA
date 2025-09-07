import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatFeed = ({ threats, onThreatSelect, onEscalate }) => {
  const mockThreats = [
    {
      id: 'T001',
      title: 'Unidentified Aircraft Detected',
      description: 'High-speed aircraft approaching restricted airspace from northwest sector. No transponder signal detected.',
      priority: 'critical',
      timestamp: new Date(Date.now() - 300000),
      location: 'Sector 7-Alpha',
      classification: 'Hostile',
      confidence: 95,
      source: 'Radar Station Delta-3'
    },
    {
      id: 'T002',
      title: 'Suspicious Drone Activity',
      description: 'Multiple small UAVs detected near critical infrastructure. Pattern suggests coordinated reconnaissance mission.',
      priority: 'high',
      timestamp: new Date(Date.now() - 900000),
      location: 'Grid Reference 4B-22',
      classification: 'Suspicious',
      confidence: 87,
      source: 'Optical Surveillance'
    },
    {
      id: 'T003',
      title: 'Naval Vessel Off Course',
      description: 'Commercial vessel deviating from designated shipping lane. Communications attempts unsuccessful.',
      priority: 'medium',
      timestamp: new Date(Date.now() - 1800000),
      location: 'Maritime Zone Echo',
      classification: 'Unknown',
      confidence: 72,
      source: 'Coastal Radar'
    },
    {
      id: 'T004',
      title: 'Communication Interference',
      description: 'Unusual electromagnetic signatures detected. Possible jamming attempt on military frequencies.',
      priority: 'high',
      timestamp: new Date(Date.now() - 2700000),
      location: 'Communication Hub Bravo',
      classification: 'Electronic Warfare',
      confidence: 91,
      source: 'SIGINT Station'
    },
    {
      id: 'T005',
      title: 'Perimeter Breach Alert',
      description: 'Motion sensors triggered at Forward Operating Base Charlie. Visual confirmation pending.',
      priority: 'medium',
      timestamp: new Date(Date.now() - 3600000),
      location: 'FOB Charlie Perimeter',
      classification: 'Security Breach',
      confidence: 68,
      source: 'Perimeter Defense System'
    }
  ];

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'critical':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error',
          icon: 'AlertTriangle',
          label: 'CRITICAL'
        };
      case 'high':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning',
          icon: 'AlertCircle',
          label: 'HIGH'
        };
      case 'medium':
        return {
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary',
          icon: 'Info',
          label: 'MEDIUM'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          borderColor: 'border-muted',
          icon: 'Circle',
          label: 'LOW'
        };
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ago`;
    }
    return `${minutes}m ago`;
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={16} className="text-primary" />
          <h3 className="text-sm font-semibold font-mono text-foreground">
            THREAT FEED
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground font-mono">
            {mockThreats?.length} Active
          </span>
          <Button variant="ghost" size="xs" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>
      </div>
      {/* Threat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 p-2">
          {mockThreats?.map((threat) => {
            const config = getPriorityConfig(threat?.priority);
            
            return (
              <div
                key={threat?.id}
                className={`
                  p-3 rounded-lg border cursor-pointer transition-tactical
                  ${config?.bgColor} ${config?.borderColor}
                  hover:bg-opacity-20 hover:scale-[1.02]
                `}
                onClick={() => onThreatSelect && onThreatSelect(threat)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={config?.icon} size={14} className={config?.color} />
                    <span className={`text-xs font-bold font-mono ${config?.color}`}>
                      {config?.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground font-mono">
                      {formatTimestamp(threat?.timestamp)}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      ID: {threat?.id}
                    </div>
                  </div>
                </div>
                {/* Title */}
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {threat?.title}
                </h4>
                {/* Description */}
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {threat?.description}
                </p>
                {/* Details */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs font-mono">
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <div className="text-foreground">{threat?.location}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Classification:</span>
                    <div className="text-foreground">{threat?.classification}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Confidence:</span>
                    <div className="text-foreground">{threat?.confidence}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Source:</span>
                    <div className="text-foreground">{threat?.source}</div>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="xs"
                      iconName="Eye"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onThreatSelect && onThreatSelect(threat);
                      }}
                    >
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="xs"
                      iconName="ArrowUp"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEscalate && onEscalate(threat);
                      }}
                    >
                      Escalate
                    </Button>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      threat?.confidence > 90 ? 'bg-success' :
                      threat?.confidence > 70 ? 'bg-warning' : 'bg-error'
                    }`} />
                    <span className="text-xs text-muted-foreground">
                      {threat?.confidence > 90 ? 'High' :
                       threat?.confidence > 70 ? 'Med' : 'Low'} Conf.
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-muted-foreground">
            Last updated: {new Date()?.toLocaleTimeString()}
          </span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-success">Live Feed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatFeed;