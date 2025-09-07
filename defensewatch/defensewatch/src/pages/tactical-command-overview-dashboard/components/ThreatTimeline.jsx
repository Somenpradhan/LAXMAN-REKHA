import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const ThreatTimeline = ({ timeRange }) => {
  const generateTimelineData = () => {
    const now = new Date();
    const data = [];
    const intervals = timeRange === '30min' ? 30 : timeRange === '1hr' ? 60 : 
                     timeRange === '2hr' ? 120 : timeRange === '6hr' ? 360 : 
                     timeRange === '12hr' ? 720 : 1440;
    
    const stepSize = timeRange === '30min' ? 5 : timeRange === '1hr' ? 10 : 
                    timeRange === '2hr' ? 20 : timeRange === '6hr' ? 60 : 
                    timeRange === '12hr' ? 120 : 240;

    for (let i = intervals; i >= 0; i -= stepSize) {
      const timestamp = new Date(now.getTime() - i * 60000);
      const hour = timestamp?.getHours();
      
      // Simulate threat patterns - higher activity during certain hours
      const baseActivity = Math.random() * 5;
      const peakMultiplier = (hour >= 6 && hour <= 10) || (hour >= 18 && hour <= 22) ? 2 : 1;
      
      data?.push({
        time: timestamp?.toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        timestamp: timestamp,
        critical: Math.floor(Math.random() * 3 * peakMultiplier),
        high: Math.floor((Math.random() * 8 + baseActivity) * peakMultiplier),
        medium: Math.floor((Math.random() * 15 + baseActivity * 2) * peakMultiplier),
        total: 0
      });
    }

    // Calculate totals
    data?.forEach(item => {
      item.total = item?.critical + item?.high + item?.medium;
    });

    return data;
  };

  const timelineData = generateTimelineData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover text-popover-foreground p-3 rounded-lg border border-border tactical-shadow">
          <p className="font-mono text-sm font-semibold mb-2">{`Time: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="font-mono text-xs" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value} threats`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case '30min': return 'Last 30 Minutes';
      case '1hr': return 'Last Hour';
      case '2hr': return 'Last 2 Hours';
      case '6hr': return 'Last 6 Hours';
      case '12hr': return 'Last 12 Hours';
      case '24hr': return 'Last 24 Hours';
      default: return 'Timeline';
    }
  };

  const totalThreats = timelineData?.reduce((sum, item) => sum + item?.total, 0);
  const avgThreats = Math.round(totalThreats / timelineData?.length);
  const peakThreats = Math.max(...timelineData?.map(item => item?.total));

  return (
    <div className="h-full bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} className="text-primary" />
          <h3 className="text-sm font-semibold font-mono text-foreground">
            THREAT TIMELINE - {getTimeRangeLabel()}
          </h3>
        </div>
        <div className="flex items-center space-x-4 text-xs font-mono">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-muted-foreground">Critical</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">High</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Medium</span>
          </div>
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 p-4 border-b border-border">
        <div className="text-center">
          <div className="text-lg font-bold font-mono text-foreground">{totalThreats}</div>
          <div className="text-xs text-muted-foreground font-mono">Total Threats</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold font-mono text-foreground">{avgThreats}</div>
          <div className="text-xs text-muted-foreground font-mono">Average/Period</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold font-mono text-foreground">{peakThreats}</div>
          <div className="text-xs text-muted-foreground font-mono">Peak Activity</div>
        </div>
      </div>
      {/* Chart */}
      <div className="p-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="criticalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d32f2f" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#d32f2f" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="highGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff8f00" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ff8f00" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="mediumGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a237e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1a237e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(125, 133, 144, 0.2)" />
              <XAxis 
                dataKey="time" 
                stroke="#7d8590"
                fontSize={10}
                fontFamily="monospace"
              />
              <YAxis 
                stroke="#7d8590"
                fontSize={10}
                fontFamily="monospace"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="critical"
                stackId="1"
                stroke="#d32f2f"
                fill="url(#criticalGradient)"
                strokeWidth={2}
                name="Critical"
              />
              <Area
                type="monotone"
                dataKey="high"
                stackId="1"
                stroke="#ff8f00"
                fill="url(#highGradient)"
                strokeWidth={2}
                name="High"
              />
              <Area
                type="monotone"
                dataKey="medium"
                stackId="1"
                stroke="#1a237e"
                fill="url(#mediumGradient)"
                strokeWidth={2}
                name="Medium"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-muted-foreground">
            Data refreshed every 30 seconds
          </span>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={12} className="text-muted-foreground" />
            <span className="text-muted-foreground">
              {new Date()?.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatTimeline;