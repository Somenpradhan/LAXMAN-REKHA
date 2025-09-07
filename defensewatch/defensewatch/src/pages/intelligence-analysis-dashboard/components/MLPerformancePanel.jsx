import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const MLPerformancePanel = () => {
  const [selectedModel, setSelectedModel] = useState('primary');

  const performanceData = [
    { time: '14:00', accuracy: 94.2, precision: 91.8, recall: 89.5 },
    { time: '15:00', accuracy: 95.1, precision: 92.3, recall: 90.2 },
    { time: '16:00', accuracy: 93.8, precision: 90.9, recall: 88.7 },
    { time: '17:00', accuracy: 96.2, precision: 93.5, recall: 91.8 },
    { time: '18:00', accuracy: 94.7, precision: 92.1, recall: 89.9 }
  ];

  const classificationData = [
    { name: 'True Positive', value: 847, color: '#2e7d32' },
    { name: 'True Negative', value: 1203, color: '#1a237e' },
    { name: 'False Positive', value: 45, color: '#ff8f00' },
    { name: 'False Negative', value: 23, color: '#da3633' }
  ];

  const modelMetrics = {
    primary: {
      name: 'Primary Threat Classifier',
      version: 'v2.4.1',
      accuracy: 94.7,
      precision: 92.1,
      recall: 89.9,
      f1Score: 91.0,
      falsePositiveRate: 2.1,
      lastTrained: '25/08/2025',
      status: 'active'
    },
    secondary: {
      name: 'Weather Impact Predictor',
      version: 'v1.8.3',
      accuracy: 87.3,
      precision: 85.6,
      recall: 84.2,
      f1Score: 84.9,
      falsePositiveRate: 4.3,
      lastTrained: '23/08/2025',
      status: 'active'
    }
  };

  const currentModel = modelMetrics?.[selectedModel];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 tactical-shadow">
          <p className="text-sm font-medium text-foreground font-mono mb-2">{`Time: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm font-mono" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Model Selection */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Brain" size={18} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground font-mono">
              ML Model Performance
            </h3>
          </div>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e?.target?.value)}
            className="bg-input border border-border rounded px-3 py-1 text-sm font-mono text-foreground"
          >
            <option value="primary">Primary Classifier</option>
            <option value="secondary">Weather Predictor</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground font-mono">Accuracy</span>
              <span className="text-sm font-medium text-success font-mono">
                {currentModel?.accuracy}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground font-mono">Precision</span>
              <span className="text-sm font-medium text-success font-mono">
                {currentModel?.precision}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground font-mono">Recall</span>
              <span className="text-sm font-medium text-success font-mono">
                {currentModel?.recall}%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground font-mono">F1-Score</span>
              <span className="text-sm font-medium text-success font-mono">
                {currentModel?.f1Score}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground font-mono">False Positive</span>
              <span className="text-sm font-medium text-warning font-mono">
                {currentModel?.falsePositiveRate}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground font-mono">Last Trained</span>
              <span className="text-sm font-medium text-foreground font-mono">
                {currentModel?.lastTrained}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Performance Trending */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Activity" size={18} className="text-secondary" />
          <h4 className="text-md font-semibold text-foreground font-mono">
            Performance Trending
          </h4>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(125, 133, 144, 0.2)" />
              <XAxis 
                dataKey="time" 
                stroke="#7d8590"
                fontSize={11}
                fontFamily="monospace"
              />
              <YAxis 
                domain={[80, 100]}
                stroke="#7d8590"
                fontSize={11}
                fontFamily="monospace"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#2e7d32" 
                strokeWidth={2}
                dot={{ fill: '#2e7d32', strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="precision" 
                stroke="#1a237e" 
                strokeWidth={2}
                dot={{ fill: '#1a237e', strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="recall" 
                stroke="#ff8f00" 
                strokeWidth={2}
                dot={{ fill: '#ff8f00', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Classification Matrix */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Target" size={18} className="text-warning" />
          <h4 className="text-md font-semibold text-foreground font-mono">
            Classification Matrix
          </h4>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={classificationData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {classificationData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value}`, name]}
                contentStyle={{
                  backgroundColor: '#1c2128',
                  border: '1px solid rgba(125, 133, 144, 0.2)',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {classificationData?.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item?.color }}
              />
              <span className="text-xs text-muted-foreground font-mono">
                {item?.name}: {item?.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Model Status */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground font-mono">
              Model Status: Active
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full pulse-alert" />
            <span className="text-xs text-muted-foreground font-mono">
              Real-time inference
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLPerformancePanel;