import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ThreatLevelSelector from './components/ThreatLevelSelector';
import TimeRangePicker from './components/TimeRangePicker';
import AutoRefreshToggle from './components/AutoRefreshToggle';
import EmergencyAlertStatus from './components/EmergencyAlertStatus';
import KPICard from './components/KPICard';
import GeospatialMap from './components/GeospatialMap';
import ThreatFeed from './components/ThreatFeed';
import ThreatTimeline from './components/ThreatTimeline';

const TacticalCommandOverviewDashboard = () => {
  const [threatLevel, setThreatLevel] = useState('all');
  const [timeRange, setTimeRange] = useState('1hr');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [emergencyStatus, setEmergencyStatus] = useState('normal');
  const [alertCount, setAlertCount] = useState(0);

  // Add mock data for threats and assets
  const [threats, setThreats] = useState([
    { id: 1, type: 'missile', severity: 'high', lat: 40.7128, lng: -74.0060, timestamp: new Date() },
    { id: 2, type: 'aircraft', severity: 'medium', lat: 40.7589, lng: -73.9851, timestamp: new Date() },
    { id: 3, type: 'ground', severity: 'low', lat: 40.7282, lng: -73.7949, timestamp: new Date() }
  ]);

  const [assets, setAssets] = useState([
    { id: 1, type: 'radar', status: 'active', lat: 40.7500, lng: -73.9857 },
    { id: 2, type: 'missile_defense', status: 'active', lat: 40.7200, lng: -74.0100 },
    { id: 3, type: 'aircraft', status: 'patrol', lat: 40.7400, lng: -73.9900 }
  ]);

  // Mock KPI data
  const [kpiData, setKpiData] = useState({
    activeThreats: { value: 23, trend: 'up', trendValue: '+3', status: 'warning' },
    systemReadiness: { value: 94, trend: 'stable', trendValue: '0%', status: 'success' },
    assetDeployment: { value: 87, trend: 'up', trendValue: '+2%', status: 'success' },
    weatherImpact: { value: 15, trend: 'down', trendValue: '-5%', status: 'normal' },
    mlAccuracy: { value: 96.7, trend: 'up', trendValue: '+0.3%', status: 'success' },
    responseTime: { value: 2.4, trend: 'down', trendValue: '-0.2s', status: 'success' }
  });

  // Auto-refresh logic
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate data updates
      setKpiData(prev => ({
        ...prev,
        activeThreats: {
          ...prev?.activeThreats,
          value: Math.max(0, prev?.activeThreats?.value + Math.floor(Math.random() * 3) - 1)
        },
        systemReadiness: {
          ...prev?.systemReadiness,
          value: Math.min(100, Math.max(85, prev?.systemReadiness?.value + Math.floor(Math.random() * 3) - 1))
        }
      }));

      // Update emergency status based on threat count
      const currentThreats = kpiData?.activeThreats?.value;
      if (currentThreats > 30) {
        setEmergencyStatus('critical');
        setAlertCount(Math.floor(currentThreats / 10));
      } else if (currentThreats > 15) {
        setEmergencyStatus('warning');
        setAlertCount(Math.floor(currentThreats / 15));
      } else {
        setEmergencyStatus('normal');
        setAlertCount(0);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh, kpiData?.activeThreats?.value]);

  const handleThreatSelect = (threat) => {
    setSelectedThreat(threat);
  };

  const handleThreatEscalate = (threat) => {
    console.log('Escalating threat:', threat?.id);
    // Implement escalation logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 p-6">
        <div className="max-w-[1920px] mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground font-mono mb-2">
              TACTICAL COMMAND OVERVIEW
            </h1>
            <p className="text-sm text-muted-foreground font-mono">
              Real-time situational awareness and threat assessment dashboard
            </p>
          </div>

          {/* Global Controls - 24 column grid */}
          <div className="grid grid-cols-24 gap-4 mb-6">
            <div className="col-span-6 lg:col-span-4">
              <ThreatLevelSelector 
                value={threatLevel} 
                onChange={setThreatLevel} 
              />
            </div>
            <div className="col-span-6 lg:col-span-4">
              <TimeRangePicker 
                value={timeRange} 
                onChange={setTimeRange} 
              />
            </div>
            <div className="col-span-6 lg:col-span-4">
              <AutoRefreshToggle 
                isEnabled={autoRefresh} 
                onToggle={() => setAutoRefresh(!autoRefresh)} 
              />
            </div>
            <div className="col-span-6 lg:col-span-12">
              <EmergencyAlertStatus 
                status={emergencyStatus} 
                alertCount={alertCount} 
              />
            </div>
          </div>

          {/* KPI Cards - 6 equal width cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            <KPICard
              title="Active Threats"
              value={kpiData?.activeThreats?.value}
              icon="AlertTriangle"
              trend={kpiData?.activeThreats?.trend}
              trendValue={kpiData?.activeThreats?.trendValue}
              status={kpiData?.activeThreats?.status}
              description="Current threat detections"
            />
            <KPICard
              title="System Readiness"
              value={kpiData?.systemReadiness?.value}
              unit="%"
              icon="Shield"
              trend={kpiData?.systemReadiness?.trend}
              trendValue={kpiData?.systemReadiness?.trendValue}
              status={kpiData?.systemReadiness?.status}
              description="Overall system health"
            />
            <KPICard
              title="Asset Deployment"
              value={kpiData?.assetDeployment?.value}
              unit="%"
              icon="MapPin"
              trend={kpiData?.assetDeployment?.trend}
              trendValue={kpiData?.assetDeployment?.trendValue}
              status={kpiData?.assetDeployment?.status}
              description="Deployed assets ratio"
            />
            <KPICard
              title="Weather Impact"
              value={kpiData?.weatherImpact?.value}
              unit="%"
              icon="Cloud"
              trend={kpiData?.weatherImpact?.trend}
              trendValue={kpiData?.weatherImpact?.trendValue}
              status={kpiData?.weatherImpact?.status}
              description="Weather effect on ops"
            />
            <KPICard
              title="ML Accuracy"
              value={kpiData?.mlAccuracy?.value}
              unit="%"
              icon="Brain"
              trend={kpiData?.mlAccuracy?.trend}
              trendValue={kpiData?.mlAccuracy?.trendValue}
              status={kpiData?.mlAccuracy?.status}
              description="AI model performance"
            />
            <KPICard
              title="Response Time"
              value={kpiData?.responseTime?.value}
              unit="s"
              icon="Clock"
              trend={kpiData?.responseTime?.trend}
              trendValue={kpiData?.responseTime?.trendValue}
              status={kpiData?.responseTime?.status}
              description="Average response time"
            />
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-24 gap-6 mb-6">
            {/* Geospatial Map - 16 columns */}
            <div className="col-span-24 lg:col-span-16">
              <div className="h-[600px]">
                <GeospatialMap
                  threats={threats}
                  assets={assets}
                  selectedThreat={selectedThreat}
                  onThreatSelect={handleThreatSelect}
                />
              </div>
            </div>

            {/* Threat Feed Sidebar - 8 columns */}
            <div className="col-span-24 lg:col-span-8">
              <div className="h-[600px]">
                <ThreatFeed
                  threats={threats}
                  onThreatSelect={handleThreatSelect}
                  onEscalate={handleThreatEscalate}
                />
              </div>
            </div>
          </div>

          {/* Threat Timeline - Full width */}
          <div className="mb-6">
            <div className="h-[400px]">
              <ThreatTimeline timeRange={timeRange} />
            </div>
          </div>

          {/* Footer Status */}
          <div className="mt-8 p-4 bg-card rounded-lg border border-border">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-4">
                <span className="text-muted-foreground">
                  Last Update: {new Date()?.toLocaleString()}
                </span>
                <span className="text-muted-foreground">
                  System Status: Operational
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-muted-foreground">
                  DefenseWatch v2.1.0
                </span>
                <span className="text-success">
                  ● Connected
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TacticalCommandOverviewDashboard;