// chartpanel.js
import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from 'recharts';
import { FaChartBar, FaEye, FaEyeSlash } from 'react-icons/fa';

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  min-width: 0; /* prevent flex parents from collapsing width */
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
  min-width: 0;
`;

const PanelTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #4a5568;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  white-space: nowrap;
  
  &:hover {
    border-color: #667eea;
    color: #667eea;
  }
`;

const ChartContainer = styled.div`
  background: #f7fafc;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  overflow: hidden;
  box-sizing: border-box;
  min-width: 0;
`;

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1.5rem 0;
  text-align: center;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 450px; /* explicit height for ResponsiveContainer */
  position: relative;
  overflow: hidden;
  min-width: 0;
`;

const ChartPlaceholder = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
  font-style: italic;
  font-size: 1.125rem;
`;

function ChartPanel({ results, showCharts, setShowCharts }) {
  if (!results) return null;

  const chartData = results.map(product => ({
    name: product.name,
    units: Math.round(product.unitsToSell),
    leads: Math.round(product.leadsRequired),
    doubleLeads: Math.round(product.doubleLeads),
    revenue: Math.round(product.revenueGoalProduct)
  }));

  // Force Recharts to recompute sizes when charts are revealed
  useEffect(() => {
    if (showCharts && typeof window !== 'undefined') {
      const id = setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 0);
      return () => clearTimeout(id);
    }
  }, [showCharts]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: 'white',
            padding: '10px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '4px 0', color: entry.color }}>
              {entry.dataKey}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!showCharts) {
    return (
      <Panel>
        <PanelHeader>
          <PanelTitle>
            <FaChartBar />
            Data Visualization
          </PanelTitle>
          <ToggleButton onClick={() => setShowCharts(true)}>
            <FaEye />
            Show Charts
          </ToggleButton>
        </PanelHeader>
        <ChartPlaceholder>
          Click "Show Charts" to visualize your sales targets
        </ChartPlaceholder>
      </Panel>
    );
  }

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          <FaChartBar />
          Data Visualization
        </PanelTitle>
        <ToggleButton onClick={() => setShowCharts(false)}>
          <FaEyeSlash />
          Hide Charts
        </ToggleButton>
      </PanelHeader>

      <ChartContainer>
        <ChartTitle>Units vs Leads Required</ChartTitle>
        <ChartWrapper>
          <ResponsiveContainer
            width="100%"
            height="100%"
            key={`${showCharts}-${chartData.length}`} /* force re-measure */
          >
            <BarChart
              data={chartData}
              margin={{ top: 30, right: 20, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                angle={-40}
                textAnchor="end"
                height={80}
                interval={0}
                fontSize={13}
                stroke="#4a5568"
                tick={{ fill: '#4a5568' }}
              />
              <YAxis
                fontSize={13}
                stroke="#4a5568"
                tick={{ fill: '#4a5568' }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Bar
                dataKey="units"
                fill="#667eea"
                name="Units to Sell"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="leads"
                fill="#48bb78"
                name="Leads Required"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </ChartContainer>
    </Panel>
  );
}

export default ChartPanel;
