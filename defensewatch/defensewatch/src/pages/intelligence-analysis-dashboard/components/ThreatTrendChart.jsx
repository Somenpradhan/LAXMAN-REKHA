import React, { useState } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ThreatTrendChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const chartData = [
    {
      date: '22/08',
      threats: 45,
      predictions: 42,
      weatherImpact: 15,
      confidence: 87
    },
    {
      date: '23/08',
      threats: 52,
      predictions: 48,
      weatherImpact: 22,
      confidence: 91
    },
    {
      date: '24/08',
      threats: 38,
      predictions: 41,
      weatherImpact: 8,
      confidence: 94
    },
    {
      date: '25/08',
      threats: 67,
      predictions: 63,
      weatherImpact: 35,
      confidence: 89
    },
    {
      date: '26/08',
      threats: 71,
      predictions: 69,
      weatherImpact: 28,
      confidence: 92
    },
    {
      date: '27/08',
      threats: 58,
      predictions: 55,
      weatherImpact: 18,
      confidence: 88
    },
    {
      date: '28/08',
      threats: 63,
      predictions: 61,
      weatherImpact: 25,
      confidence: 90
    },
    {
      date: '29/08',
      threats: 74,
      predictions: 71,
      weatherImpact: 32,
      confidence: 93
    }
  ];

  const periodOptions = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north', label: 'Northern' },
    { value: 'south', label: 'Southern' },
    { value: 'east', label: 'Eastern' },
    { value: 'west', label: 'Western' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 tactical-shadow">
          <p className="text-sm font-medium text-foreground font-mono mb-2">{`Date: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm font-mono" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}${entry?.name === 'confidence' ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleDrillDown = (data) => {
    console.log('Drilling down into data:', data);
    // Mock drill-down functionality
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground font-mono">
            Threat Frequency Trends & Weather Correlation
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e?.target?.value)}
            className="bg-input border border-border rounded px-3 py-1 text-sm font-mono text-foreground"
          >
            {periodOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e?.target?.value)}
            className="bg-input border border-border rounded px-3 py-1 text-sm font-mono text-foreground"
          >
            {regionOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            onClick={handleDrillDown}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(125, 133, 144, 0.2)" />
            <XAxis 
              dataKey="date" 
              stroke="#7d8590"
              fontSize={12}
              fontFamily="monospace"
            />
            <YAxis 
              stroke="#7d8590"
              fontSize={12}
              fontFamily="monospace"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                fontSize: '12px', 
                fontFamily: 'monospace',
                color: '#f0f6ff'
              }}
            />
            <Bar 
              dataKey="threats" 
              fill="#1a237e" 
              name="Actual Threats"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="weatherImpact" 
              fill="#ff8f00" 
              name="Weather Impact"
              radius={[2, 2, 0, 0]}
            />
            <Line 
              type="monotone" 
              dataKey="predictions" 
              stroke="#2e7d32" 
              strokeWidth={2}
              name="ML Predictions"
              dot={{ fill: '#2e7d32', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="confidence" 
              stroke="#da3633" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Confidence %"
              dot={{ fill: '#da3633', strokeWidth: 2, r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground font-mono">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span>Actual Threats</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-secondary rounded"></div>
            <span>ML Predictions</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded"></div>
            <span>Weather Impact</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          Click data points for detailed analysis
        </div>
      </div>
    </div>
  );
};

export default ThreatTrendChart;