import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const GeospatialMap = ({ threats, assets, selectedThreat, onThreatSelect }) => {
  const [scannerAngle, setScannerAngle] = useState(0);
  const [mapCenter] = useState({ lat: 28.6139, lng: 77.2090 }); // New Delhi coordinates

  useEffect(() => {
    const interval = setInterval(() => {
      setScannerAngle(prev => (prev + 2) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const mockThreats = [
    {
      id: 'T001',
      type: 'aircraft',
      position: { lat: 28.7041, lng: 77.1025 },
      classification: 'hostile',
      priority: 'critical',
      callsign: 'UNK-001',
      altitude: '35000ft',
      speed: '450kts'
    },
    {
      id: 'T002',
      type: 'drone',
      position: { lat: 28.5355, lng: 77.3910 },
      classification: 'suspicious',
      priority: 'high',
      callsign: 'UAV-002',
      altitude: '500ft',
      speed: '25kts'
    },
    {
      id: 'T003',
      type: 'naval',
      position: { lat: 28.4595, lng: 77.0266 },
      classification: 'unknown',
      priority: 'medium',
      callsign: 'VES-003',
      altitude: 'Sea Level',
      speed: '12kts'
    }
  ];

  const mockAssets = [
    {
      id: 'A001',
      type: 'radar',
      position: { lat: 28.6139, lng: 77.2090 },
      status: 'active',
      range: '200km'
    },
    {
      id: 'A002',
      type: 'base',
      position: { lat: 28.5706, lng: 77.3272 },
      status: 'operational',
      personnel: 1500
    }
  ];

  const getThreatColor = (priority) => {
    switch (priority) {
      case 'critical': return '#d32f2f';
      case 'high': return '#ff8f00';
      case 'medium': return '#1976d2';
      default: return '#757575';
    }
  };

  const getThreatIcon = (type) => {
    switch (type) {
      case 'aircraft': return 'Plane';
      case 'drone': return 'Zap';
      case 'naval': return 'Ship';
      default: return 'MapPin';
    }
  };

  return (
    <div className="relative w-full h-full bg-card rounded-lg border border-border overflow-hidden">
      {/* Map Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-card/90 backdrop-blur-sm border-b border-border p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Map" size={16} className="text-primary" />
            <span className="text-sm font-medium font-mono text-foreground">
              TACTICAL OVERVIEW MAP
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span className="text-muted-foreground">Critical</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-muted-foreground">High</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Medium</span>
            </div>
          </div>
        </div>
      </div>
      {/* Google Maps Iframe */}
      <div className="absolute inset-0 pt-16">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Tactical Command Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=10&output=embed`}
          className="border-0"
        />
      </div>
      {/* Radar Scanner Overlay */}
      <div className="absolute inset-0 pt-16 pointer-events-none">
        <div className="relative w-full h-full overflow-hidden">
          <div 
            className="absolute top-1/2 left-1/2 w-96 h-96 border border-success/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              background: `conic-gradient(from ${scannerAngle}deg, transparent 0deg, rgba(34, 197, 94, 0.1) 30deg, transparent 60deg)`
            }}
          />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-success/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-success/40 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      {/* Threat Markers Overlay */}
      <div className="absolute inset-0 pt-16 pointer-events-none">
        {mockThreats?.map((threat) => (
          <div
            key={threat?.id}
            className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${((threat?.position?.lng - 77.0) / 0.5) * 100}%`,
              top: `${((28.8 - threat?.position?.lat) / 0.4) * 100}%`
            }}
            onClick={() => onThreatSelect && onThreatSelect(threat)}
          >
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full border-2
              ${threat?.priority === 'critical' ? 'bg-error/20 border-error pulse-alert' : 
                threat?.priority === 'high'? 'bg-warning/20 border-warning' : 'bg-primary/20 border-primary'}
              transition-tactical hover:scale-110
            `}>
              <Icon 
                name={getThreatIcon(threat?.type)} 
                size={14} 
                color={getThreatColor(threat?.priority)}
              />
            </div>
            {selectedThreat?.id === threat?.id && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-popover text-popover-foreground p-2 rounded border text-xs font-mono whitespace-nowrap z-30">
                <div className="font-semibold">{threat?.callsign}</div>
                <div>Alt: {threat?.altitude}</div>
                <div>Spd: {threat?.speed}</div>
                <div className="capitalize">Status: {threat?.classification}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Asset Markers Overlay */}
      <div className="absolute inset-0 pt-16 pointer-events-none">
        {mockAssets?.map((asset) => (
          <div
            key={asset?.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${((asset?.position?.lng - 77.0) / 0.5) * 100}%`,
              top: `${((28.8 - asset?.position?.lat) / 0.4) * 100}%`
            }}
          >
            <div className="flex items-center justify-center w-6 h-6 bg-success/20 border-2 border-success rounded">
              <Icon 
                name={asset?.type === 'radar' ? 'Radio' : 'Home'} 
                size={12} 
                className="text-success"
              />
            </div>
          </div>
        ))}
      </div>
      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col space-y-2">
        <button className="flex items-center justify-center w-10 h-10 bg-card border border-border rounded hover:bg-muted/50 transition-tactical">
          <Icon name="Plus" size={16} className="text-foreground" />
        </button>
        <button className="flex items-center justify-center w-10 h-10 bg-card border border-border rounded hover:bg-muted/50 transition-tactical">
          <Icon name="Minus" size={16} className="text-foreground" />
        </button>
        <button className="flex items-center justify-center w-10 h-10 bg-card border border-border rounded hover:bg-muted/50 transition-tactical">
          <Icon name="RotateCcw" size={16} className="text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default GeospatialMap;