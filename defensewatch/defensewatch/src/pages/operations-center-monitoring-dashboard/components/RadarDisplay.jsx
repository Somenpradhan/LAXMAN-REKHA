import React, { useState, useEffect } from 'react';


const RadarDisplay = () => {
  const [sweepAngle, setSweepAngle] = useState(0);
  const [activeTargets, setActiveTargets] = useState([]);

  // Mock radar targets
  const radarTargets = [
    { id: 1, x: 120, y: 80, type: 'aircraft', threat: 'low', callsign: 'AF-001' },
    { id: 2, x: 200, y: 150, type: 'drone', threat: 'medium', callsign: 'DR-045' },
    { id: 3, x: 80, y: 200, type: 'naval', threat: 'high', callsign: 'NV-012' },
    { id: 4, x: 280, y: 120, type: 'aircraft', threat: 'low', callsign: 'AF-078' },
    { id: 5, x: 160, y: 240, type: 'unknown', threat: 'critical', callsign: 'UK-003' }
  ];

  const sensorStatus = [
    { id: 'radar-1', name: 'Primary Radar', status: 'operational', coverage: '360°' },
    { id: 'radar-2', name: 'Secondary Radar', status: 'operational', coverage: '270°' },
    { id: 'iff', name: 'IFF System', status: 'warning', coverage: '180°' },
    { id: 'adsb', name: 'ADS-B Receiver', status: 'operational', coverage: '300°' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSweepAngle(prev => (prev + 2) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getTargetColor = (threat) => {
    switch (threat) {
      case 'low': return '#2e7d32';
      case 'medium': return '#ff8f00';
      case 'high': return '#d32f2f';
      case 'critical': return '#d73a49';
      default: return '#7d8590';
    }
  };

  const getTargetIcon = (type) => {
    switch (type) {
      case 'aircraft': return 'Plane';
      case 'drone': return 'Zap';
      case 'naval': return 'Ship';
      default: return 'AlertTriangle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 tactical-shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold font-mono text-foreground">
          360° Threat Detection Coverage
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-mono text-success">ACTIVE SWEEP</span>
          </div>
          <div className="text-sm font-mono text-muted-foreground">
            Range: 50 NM
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Radar Display */}
        <div className="lg:col-span-3">
          <div className="relative bg-background rounded-lg border border-border p-4 aspect-square max-w-md mx-auto">
            {/* Concentric circles */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
              {/* Grid circles */}
              {[80, 120, 160, 200, 240]?.map((radius, index) => (
                <circle
                  key={index}
                  cx="160"
                  cy="160"
                  r={radius / 2}
                  fill="none"
                  stroke="rgba(125, 133, 144, 0.3)"
                  strokeWidth="1"
                />
              ))}
              
              {/* Grid lines */}
              <g stroke="rgba(125, 133, 144, 0.3)" strokeWidth="1">
                <line x1="160" y1="40" x2="160" y2="280" />
                <line x1="40" y1="160" x2="280" y2="160" />
                <line x1="75" y1="75" x2="245" y2="245" />
                <line x1="245" y1="75" x2="75" y2="245" />
              </g>

              {/* Radar sweep */}
              <defs>
                <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(46, 125, 50, 0)" />
                  <stop offset="70%" stopColor="rgba(46, 125, 50, 0.3)" />
                  <stop offset="100%" stopColor="rgba(46, 125, 50, 0.8)" />
                </linearGradient>
              </defs>
              
              <line
                x1="160"
                y1="160"
                x2={160 + 120 * Math.cos((sweepAngle - 90) * Math.PI / 180)}
                y2={160 + 120 * Math.sin((sweepAngle - 90) * Math.PI / 180)}
                stroke="url(#sweepGradient)"
                strokeWidth="2"
              />

              {/* Targets */}
              {radarTargets?.map((target) => (
                <g key={target?.id}>
                  <circle
                    cx={target?.x}
                    cy={target?.y}
                    r="4"
                    fill={getTargetColor(target?.threat)}
                    className="animate-pulse"
                  />
                  <text
                    x={target?.x + 8}
                    y={target?.y - 8}
                    fill={getTargetColor(target?.threat)}
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {target?.callsign}
                  </text>
                </g>
              ))}

              {/* Range markers */}
              <g fill="rgba(125, 133, 144, 0.6)" fontSize="10" fontFamily="monospace">
                <text x="165" y="85" textAnchor="middle">10</text>
                <text x="165" y="105" textAnchor="middle">20</text>
                <text x="165" y="125" textAnchor="middle">30</text>
                <text x="165" y="145" textAnchor="middle">40</text>
                <text x="165" y="165" textAnchor="middle">50 NM</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Sensor Status */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold font-mono text-foreground uppercase tracking-wide">
            Sensor Systems
          </h3>
          
          {sensorStatus?.map((sensor) => (
            <div key={sensor?.id} className="bg-muted/20 rounded-lg p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-mono text-foreground">
                  {sensor?.name}
                </span>
                <div className={`flex items-center space-x-1 ${getStatusColor(sensor?.status)}`}>
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  <span className="text-xs font-mono uppercase">
                    {sensor?.status}
                  </span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                Coverage: {sensor?.coverage}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold font-mono text-foreground uppercase tracking-wide mb-3">
              Threat Levels
            </h4>
            <div className="space-y-2">
              {[
                { level: 'Low', color: '#2e7d32' },
                { level: 'Medium', color: '#ff8f00' },
                { level: 'High', color: '#d32f2f' },
                { level: 'Critical', color: '#d73a49' }
              ]?.map((item) => (
                <div key={item?.level} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item?.color }}
                  ></div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {item?.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarDisplay;