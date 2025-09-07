import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [alertCounts, setAlertCounts] = useState({
    tactical: 3,
    operations: 7,
    intelligence: 2
  });

  const navigationItems = [
    {
      id: 'tactical',
      label: 'Tactical Command',
      path: '/tactical-command-overview-dashboard',
      icon: 'Shield',
      tooltip: 'Strategic oversight and comprehensive threat assessment'
    },
    {
      id: 'operations',
      label: 'Operations Center',
      path: '/operations-center-monitoring-dashboard',
      icon: 'Activity',
      tooltip: 'Real-time monitoring and response coordination'
    },
    {
      id: 'intelligence',
      label: 'Intelligence Analysis',
      path: '/intelligence-analysis-dashboard',
      icon: 'Search',
      tooltip: 'Deep analytical capabilities and predictive modeling'
    }
  ];

  const userInfo = {
    name: 'Col. Sarah Mitchell',
    clearance: 'TOP SECRET',
    role: 'Command Officer',
    initials: 'SM'
  };

  useEffect(() => {
    // Simulate WebSocket connection monitoring
    const interval = setInterval(() => {
      const statuses = ['connected', 'reconnecting', 'disconnected'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
      setConnectionStatus(randomStatus);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-success';
      case 'reconnecting':
        return 'text-warning';
      case 'disconnected':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Wifi';
      case 'reconnecting':
        return 'WifiOff';
      case 'disconnected':
        return 'WifiOff';
      default:
        return 'Wifi';
    }
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded">
            <Icon name="Shield" size={20} className="text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground font-mono tracking-tight">
              DefenseWatch
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              Command Intelligence System
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1">
          {navigationItems?.map((item) => {
            const isActive = isActiveRoute(item?.path);
            const alertCount = alertCounts?.[item?.id];
            
            return (
              <div key={item?.id} className="relative group">
                <button
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    relative flex items-center space-x-2 px-4 py-2 rounded-md font-mono text-sm
                    transition-tactical hover:bg-muted/50
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                  title={item?.tooltip}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                  {alertCount > 0 && (
                    <span className={`
                      absolute -top-1 -right-1 flex items-center justify-center
                      min-w-[18px] h-[18px] px-1 rounded-full text-xs font-medium
                      ${alertCount > 5 ? 'bg-error text-error-foreground pulse-alert' : 'bg-warning text-warning-foreground'}
                    `}>
                      {alertCount > 99 ? '99+' : alertCount}
                    </span>
                  )}
                </button>
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-tooltip pointer-events-none whitespace-nowrap z-1100">
                  {item?.tooltip}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Status and User Section */}
        <div className="flex items-center space-x-4">
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            <Icon 
              name={getConnectionStatusIcon()} 
              size={16} 
              className={`${getConnectionStatusColor()} ${connectionStatus === 'reconnecting' ? 'animate-pulse' : ''}`}
            />
            <span className={`text-xs font-mono uppercase tracking-wide ${getConnectionStatusColor()}`}>
              {connectionStatus}
            </span>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3 pl-4 border-l border-border">
            <div className="text-right">
              <div className="text-sm font-medium text-foreground font-mono">
                {userInfo?.name}
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {userInfo?.clearance} • {userInfo?.role}
              </div>
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-full">
              <span className="text-xs font-semibold text-secondary-foreground font-mono">
                {userInfo?.initials}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;