import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import StatusCard from './components/StatusCard';
import RadarDisplay from './components/RadarDisplay';
import AlertQueue from './components/AlertQueue';
import IncidentTimeline from './components/IncidentTimeline';
import EnvironmentStatus from './components/EnvironmentStatus';

const OperationsCenterMonitoringDashboard = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    uptime: { value: 99.97, unit: '%', trend: 0.03 },
    activeFeeds: { value: 24, unit: 'feeds', trend: 2 },
    pendingAlerts: { value: 7, unit: 'alerts', trend: -3 },
    teamAvailability: { value: 18, unit: 'personnel', trend: 0 }
  });

  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // Simulate metric updates
      setSystemMetrics(prev => ({
        ...prev,
        activeFeeds: {
          ...prev?.activeFeeds,
          value: Math.max(20, Math.min(28, prev?.activeFeeds?.value + (Math.random() - 0.5) * 2))
        },
        pendingAlerts: {
          ...prev?.pendingAlerts,
          value: Math.max(0, Math.min(15, prev?.pendingAlerts?.value + (Math.random() - 0.6)))
        }
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatLastUpdate = (date) => {
    return date?.toLocaleTimeString('en-IN', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-mono text-foreground mb-2">
                Operations Center Monitoring Dashboard
              </h1>
              <p className="text-muted-foreground font-mono">
                Real-time system oversight and response coordination
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground font-mono">
                Last Update: {formatLastUpdate(lastUpdate)}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-mono text-success">LIVE MONITORING</span>
              </div>
            </div>
          </div>

          {/* Environment Status */}
          <EnvironmentStatus />

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatusCard
              title="System Uptime"
              value={systemMetrics?.uptime?.value}
              unit={systemMetrics?.uptime?.unit}
              status="operational"
              icon="Server"
              trend={systemMetrics?.uptime?.trend}
              description="Overall system availability"
              lastUpdate={formatLastUpdate(lastUpdate)}
            />
            <StatusCard
              title="Active Feeds"
              value={Math.round(systemMetrics?.activeFeeds?.value)}
              unit={systemMetrics?.activeFeeds?.unit}
              status="operational"
              icon="Activity"
              trend={systemMetrics?.activeFeeds?.trend}
              description="Real-time monitoring streams"
              lastUpdate={formatLastUpdate(lastUpdate)}
            />
            <StatusCard
              title="Pending Alerts"
              value={Math.round(systemMetrics?.pendingAlerts?.value)}
              unit={systemMetrics?.pendingAlerts?.unit}
              status={systemMetrics?.pendingAlerts?.value > 10 ? "warning" : "operational"}
              icon="AlertTriangle"
              trend={systemMetrics?.pendingAlerts?.trend}
              description="Unresolved system alerts"
              lastUpdate={formatLastUpdate(lastUpdate)}
            />
            <StatusCard
              title="Team Availability"
              value={systemMetrics?.teamAvailability?.value}
              unit={systemMetrics?.teamAvailability?.unit}
              status="operational"
              icon="Users"
              trend={systemMetrics?.teamAvailability?.trend}
              description="Response team readiness"
              lastUpdate={formatLastUpdate(lastUpdate)}
            />
          </div>

          {/* Main Monitoring Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Radar Display - 3 columns */}
            <div className="lg:col-span-3">
              <RadarDisplay />
            </div>

            {/* Alert Queue - 1 column */}
            <div className="lg:col-span-1">
              <AlertQueue />
            </div>
          </div>

          {/* Incident Timeline */}
          <IncidentTimeline />

          {/* Footer Information */}
          <div className="bg-card rounded-lg border border-border p-4 tactical-shadow">
            <div className="flex items-center justify-between text-sm font-mono text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>DefenseWatch Operations Center</span>
                <span>•</span>
                <span>Classification: RESTRICTED</span>
                <span>•</span>
                <span>Version 2.1.4</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>© {new Date()?.getFullYear()} Indian Armed Forces</span>
                <span>•</span>
                <span>All Rights Reserved</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OperationsCenterMonitoringDashboard;