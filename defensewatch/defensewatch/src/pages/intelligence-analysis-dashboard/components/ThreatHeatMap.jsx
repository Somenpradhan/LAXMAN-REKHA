import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ThreatHeatMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const heatMapData = [
    { id: 'north-1', name: 'Sector N-1', x: 20, y: 15, intensity: 85, threats: 23, type: 'high' },
    { id: 'north-2', name: 'Sector N-2', x: 40, y: 20, intensity: 45, threats: 12, type: 'medium' },
    { id: 'north-3', name: 'Sector N-3', x: 60, y: 18, intensity: 92, threats: 31, type: 'critical' },
    { id: 'central-1', name: 'Sector C-1', x: 25, y: 40, intensity: 67, threats: 18, type: 'high' },
    { id: 'central-2', name: 'Sector C-2', x: 45, y: 45, intensity: 34, threats: 8, type: 'low' },
    { id: 'central-3', name: 'Sector C-3', x: 65, y: 42, intensity: 78, threats: 25, type: 'high' },
    { id: 'south-1', name: 'Sector S-1', x: 30, y: 70, intensity: 56, threats: 15, type: 'medium' },
    { id: 'south-2', name: 'Sector S-2', x: 50, y: 75, intensity: 89, threats: 29, type: 'critical' },
    { id: 'south-3', name: 'Sector S-3', x: 70, y: 72, intensity: 41, threats: 11, type: 'medium' },
    { id: 'east-1', name: 'Sector E-1', x: 80, y: 35, intensity: 73, threats: 21, type: 'high' },
    { id: 'east-2', name: 'Sector E-2', x: 85, y: 55, intensity: 28, threats: 6, type: 'low' },
    { id: 'west-1', name: 'Sector W-1', x: 10, y: 50, intensity: 61, threats: 16, type: 'medium' },
    { id: 'west-2', name: 'Sector W-2', x: 15, y: 65, intensity: 94, threats: 33, type: 'critical' }
  ];

  const getIntensityColor = (intensity, type) => {
    if (type === 'critical') return '#da3633';
    if (type === 'high') return '#ff8f00';
    if (type === 'medium') return '#1a237e';
    return '#2e7d32';
  };

  const getIntensityOpacity = (intensity) => {
    return Math.max(0.3, intensity / 100);
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel / 1.2, 0.5));
  };

  const resetView = () => {
    setZoomLevel(1);
    setSelectedRegion(null);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Map" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground font-mono">
            Geographic Threat Density Heat Map
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-input border border-border rounded hover:bg-muted/50 transition-tactical"
            title="Zoom Out"
          >
            <Icon name="ZoomOut" size={16} className="text-foreground" />
          </button>
          <button
            onClick={resetView}
            className="p-2 bg-input border border-border rounded hover:bg-muted/50 transition-tactical"
            title="Reset View"
          >
            <Icon name="RotateCcw" size={16} className="text-foreground" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-input border border-border rounded hover:bg-muted/50 transition-tactical"
            title="Zoom In"
          >
            <Icon name="ZoomIn" size={16} className="text-foreground" />
          </button>
        </div>
      </div>
      <div className="relative bg-muted/20 rounded-lg overflow-hidden" style={{ height: '400px' }}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 100 100`}
          className="cursor-crosshair"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Grid Lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(125, 133, 144, 0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Heat Map Regions */}
          {heatMapData?.map((region) => (
            <g key={region?.id}>
              <circle
                cx={region?.x}
                cy={region?.y}
                r={Math.max(3, region?.intensity / 10)}
                fill={getIntensityColor(region?.intensity, region?.type)}
                opacity={getIntensityOpacity(region?.intensity)}
                stroke={selectedRegion?.id === region?.id ? '#f0f6ff' : 'transparent'}
                strokeWidth={selectedRegion?.id === region?.id ? 2 : 0}
                className="cursor-pointer hover:stroke-white hover:stroke-2 transition-tactical"
                onClick={() => handleRegionClick(region)}
              />
              <text
                x={region?.x}
                y={region?.y - (region?.intensity / 10 + 5)}
                textAnchor="middle"
                className="text-xs font-mono fill-foreground pointer-events-none"
                fontSize="2"
              >
                {region?.name}
              </text>
            </g>
          ))}

          {/* Compass */}
          <g transform="translate(85, 15)">
            <circle cx="0" cy="0" r="8" fill="rgba(26, 35, 126, 0.8)" stroke="#f0f6ff" strokeWidth="0.5"/>
            <text x="0" y="-5" textAnchor="middle" className="fill-foreground" fontSize="2" fontFamily="monospace">N</text>
            <text x="5" y="1" textAnchor="middle" className="fill-foreground" fontSize="2" fontFamily="monospace">E</text>
            <text x="0" y="6" textAnchor="middle" className="fill-foreground" fontSize="2" fontFamily="monospace">S</text>
            <text x="-5" y="1" textAnchor="middle" className="fill-foreground" fontSize="2" fontFamily="monospace">W</text>
          </g>
        </svg>

        {/* Region Details Overlay */}
        {selectedRegion && (
          <div className="absolute top-4 left-4 bg-popover border border-border rounded-lg p-4 tactical-shadow max-w-xs">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-foreground font-mono">
                {selectedRegion?.name}
              </h4>
              <button
                onClick={() => setSelectedRegion(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Threat Intensity:</span>
                <span className={`font-medium ${
                  selectedRegion?.type === 'critical' ? 'text-error' :
                  selectedRegion?.type === 'high' ? 'text-warning' :
                  selectedRegion?.type === 'medium' ? 'text-primary' : 'text-success'
                }`}>
                  {selectedRegion?.intensity}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Threats:</span>
                <span className="text-foreground font-medium">{selectedRegion?.threats}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Risk Level:</span>
                <span className={`font-medium uppercase ${
                  selectedRegion?.type === 'critical' ? 'text-error' :
                  selectedRegion?.type === 'high' ? 'text-warning' :
                  selectedRegion?.type === 'medium' ? 'text-primary' : 'text-success'
                }`}>
                  {selectedRegion?.type}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Legend */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full opacity-60"></div>
            <span className="text-xs text-muted-foreground font-mono">Low (0-40%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full opacity-60"></div>
            <span className="text-xs text-muted-foreground font-mono">Medium (41-65%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full opacity-60"></div>
            <span className="text-xs text-muted-foreground font-mono">High (66-85%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full opacity-60"></div>
            <span className="text-xs text-muted-foreground font-mono">Critical (86-100%)</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          Zoom: {Math.round(zoomLevel * 100)}% • Click regions for details
        </div>
      </div>
    </div>
  );
};

export default ThreatHeatMap;