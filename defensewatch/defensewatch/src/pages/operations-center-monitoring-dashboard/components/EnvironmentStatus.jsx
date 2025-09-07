import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const EnvironmentStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [shiftInfo, setShiftInfo] = useState({
    current: 'Alpha',
    nextHandover: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
    officer: 'Lt. Col. Sarah Mitchell'
  });

  const environmentData = {
    weather: {
      temperature: 24,
      humidity: 68,
      windSpeed: 12,
      visibility: 8.5,
      conditions: 'Partly Cloudy'
    },
    communications: [
      { channel: 'Primary', status: 'operational', frequency: '142.350 MHz' },
      { channel: 'Secondary', status: 'operational', frequency: '243.000 MHz' },
      { channel: 'Emergency', status: 'standby', frequency: '121.500 MHz' },
      { channel: 'Tactical', status: 'operational', frequency: '138.750 MHz' }
    ],
    systemHealth: {
      powerGrid: { status: 'operational', load: 78 },
      cooling: { status: 'operational', temp: 22 },
      backup: { status: 'standby', charge: 95 },
      network: { status: 'operational', latency: 12 }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      case 'standby': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'XCircle';
      case 'standby': return 'Clock';
      default: return 'Circle';
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

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getTimeUntilHandover = () => {
    const diff = shiftInfo?.nextHandover - currentTime;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
      {/* Time & Shift Info */}
      <div className="bg-card rounded-lg border border-border p-4 tactical-shadow">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Clock" size={16} className="text-accent" />
          <span className="text-sm font-mono text-muted-foreground uppercase">
            Operations Time
          </span>
        </div>
        <div className="space-y-2">
          <div className="text-xl font-bold font-mono text-foreground">
            {formatTime(currentTime)}
          </div>
          <div className="text-sm font-mono text-muted-foreground">
            {formatDate(currentTime)}
          </div>
          <div className="pt-2 border-t border-border/50">
            <div className="text-xs text-muted-foreground font-mono mb-1">
              Shift {shiftInfo?.current} • {shiftInfo?.officer}
            </div>
            <div className="text-xs text-accent font-mono">
              Handover in {getTimeUntilHandover()}
            </div>
          </div>
        </div>
      </div>
      {/* Weather Conditions */}
      <div className="bg-card rounded-lg border border-border p-4 tactical-shadow">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Cloud" size={16} className="text-accent" />
          <span className="text-sm font-mono text-muted-foreground uppercase">
            Weather Impact
          </span>
        </div>
        <div className="space-y-2">
          <div className="text-lg font-bold font-mono text-foreground">
            {environmentData?.weather?.temperature}°C
          </div>
          <div className="text-xs text-muted-foreground">
            {environmentData?.weather?.conditions}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div>
              <span className="text-muted-foreground">Humidity:</span>
              <span className="text-foreground ml-1">{environmentData?.weather?.humidity}%</span>
            </div>
            <div>
              <span className="text-muted-foreground">Wind:</span>
              <span className="text-foreground ml-1">{environmentData?.weather?.windSpeed} km/h</span>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Visibility:</span>
              <span className="text-foreground ml-1">{environmentData?.weather?.visibility} km</span>
            </div>
          </div>
        </div>
      </div>
      {/* Communication Channels */}
      <div className="bg-card rounded-lg border border-border p-4 tactical-shadow">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Radio" size={16} className="text-accent" />
          <span className="text-sm font-mono text-muted-foreground uppercase">
            Comm Channels
          </span>
        </div>
        <div className="space-y-2">
          {environmentData?.communications?.map((comm, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(comm?.status)} 
                  size={12} 
                  className={getStatusColor(comm?.status)} 
                />
                <span className="text-xs font-mono text-foreground">
                  {comm?.channel}
                </span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                {comm?.frequency}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* System Health */}
      <div className="bg-card rounded-lg border border-border p-4 tactical-shadow">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Server" size={16} className="text-accent" />
          <span className="text-sm font-mono text-muted-foreground uppercase">
            System Health
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(environmentData?.systemHealth?.powerGrid?.status)} 
                size={12} 
                className={getStatusColor(environmentData?.systemHealth?.powerGrid?.status)} 
              />
              <span className="text-xs font-mono text-foreground">Power</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {environmentData?.systemHealth?.powerGrid?.load}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(environmentData?.systemHealth?.cooling?.status)} 
                size={12} 
                className={getStatusColor(environmentData?.systemHealth?.cooling?.status)} 
              />
              <span className="text-xs font-mono text-foreground">Cooling</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {environmentData?.systemHealth?.cooling?.temp}°C
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(environmentData?.systemHealth?.backup?.status)} 
                size={12} 
                className={getStatusColor(environmentData?.systemHealth?.backup?.status)} 
              />
              <span className="text-xs font-mono text-foreground">Backup</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {environmentData?.systemHealth?.backup?.charge}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(environmentData?.systemHealth?.network?.status)} 
                size={12} 
                className={getStatusColor(environmentData?.systemHealth?.network?.status)} 
              />
              <span className="text-xs font-mono text-foreground">Network</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {environmentData?.systemHealth?.network?.latency}ms
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentStatus;