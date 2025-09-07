import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MetricsStrip from './components/MetricsStrip';
import FilterControls from './components/FilterControls';
import ThreatTrendChart from './components/ThreatTrendChart';
import MLPerformancePanel from './components/MLPerformancePanel';
import ThreatHeatMap from './components/ThreatHeatMap';

const IntelligenceAnalysisDashboard = () => {
  const [filters, setFilters] = useState({
    region: 'all',
    threatTypes: [],
    confidenceLevel: 'medium',
    timeComparison: 'week'
  });
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Auto-refresh data every 5 minutes
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Trigger data refresh with new filters
    console.log('Applying filters:', newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-mono mb-2">
                  Intelligence Analysis Dashboard
                </h1>
                <p className="text-muted-foreground font-mono">
                  Comprehensive threat pattern recognition and predictive modeling capabilities
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground font-mono">
                  Last Updated: {lastUpdate?.toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="text-xs text-muted-foreground font-mono mt-1">
                  Auto-refresh: 5 minutes
                </div>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls onFiltersChange={handleFiltersChange} />

          {/* Metrics Strip */}
          <MetricsStrip />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Threat Trend Chart - Main Content (8 cols) */}
            <div className="lg:col-span-8">
              <ThreatTrendChart />
            </div>

            {/* ML Performance Panel - Right Panel (4 cols) */}
            <div className="lg:col-span-4">
              <MLPerformancePanel />
            </div>
          </div>

          {/* Heat Map - Full Width */}
          <ThreatHeatMap />

          {/* Footer Status */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-between text-sm text-muted-foreground font-mono">
              <div className="flex items-center space-x-4">
                <span>DefenseWatch Intelligence Analysis System</span>
                <span>•</span>
                <span>Classification: TOP SECRET</span>
                <span>•</span>
                <span>Version 2.4.1</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full pulse-alert"></div>
                <span>System Operational</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IntelligenceAnalysisDashboard;