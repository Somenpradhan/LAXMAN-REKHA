import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import IntelligenceAnalysisDashboard from './pages/intelligence-analysis-dashboard';
import TacticalCommandOverviewDashboard from './pages/tactical-command-overview-dashboard';
import OperationsCenterMonitoringDashboard from './pages/operations-center-monitoring-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<IntelligenceAnalysisDashboard />} />
        <Route path="/intelligence-analysis-dashboard" element={<IntelligenceAnalysisDashboard />} />
        <Route path="/tactical-command-overview-dashboard" element={<TacticalCommandOverviewDashboard />} />
        <Route path="/operations-center-monitoring-dashboard" element={<OperationsCenterMonitoringDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
