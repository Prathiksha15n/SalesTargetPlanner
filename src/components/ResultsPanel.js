import React from 'react';
import styled from 'styled-components';
import { FaChartBar, FaInfoCircle } from 'react-icons/fa';
import Tooltip from './Tooltip';

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const PanelTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ResultsTable = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
`;

const TableHeaderCell = styled.th`
  padding: 1rem 0.75rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  position: relative;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid #e2e8f0;
  
  &:hover {
    background: #f7fafc;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem 0.75rem;
  vertical-align: top;
`;

const ProductName = styled.div`
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
`;

const MetricValue = styled.div`
  font-weight: 500;
  color: #4a5568;
`;

const MetricLabel = styled.div`
  font-size: 0.75rem;
  color: #718096;
  margin-bottom: 0.25rem;
`;

const SummaryCard = styled.div`
  background: linear-gradient(135deg, #f7fafc, #edf2f7);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
`;

const SummaryTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1rem 0;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const SummaryItem = styled.div`
  text-align: center;
`;

const SummaryValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.25rem;
`;

const SummaryLabel = styled.div`
  font-size: 0.75rem;
  color: #718096;
  font-weight: 500;
`;

const TooltipIcon = styled.div`
  color: #a0aec0;
  cursor: help;
  margin-left: 0.25rem;
`;

function ResultsPanel({ results }) {
  if (!results) {
    return (
      <Panel>
        <PanelTitle>
          <FaChartBar />
          Sales Target Results
        </PanelTitle>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
          Fill in the input parameters and click "Calculate" to see results
        </div>
      </Panel>
    );
  }

  const totalRevenueGoal = results.reduce((sum, product) => sum + product.revenueGoalProduct, 0);
  const totalUnits = results.reduce((sum, product) => sum + product.unitsToSell, 0);
  const totalLeads = results.reduce((sum, product) => sum + product.leadsRequired, 0);
  const totalDoubleLeads = results.reduce((sum, product) => sum + product.doubleLeads, 0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <Panel>
      <PanelTitle>
        <FaChartBar />
        Sales Target Results
      </PanelTitle>
      
      <SummaryCard>
        <SummaryTitle>Summary Overview</SummaryTitle>
        <SummaryGrid>
          <SummaryItem>
            <SummaryValue>{formatCurrency(totalRevenueGoal)}</SummaryValue>
            <SummaryLabel>Total Revenue Goal</SummaryLabel>
          </SummaryItem>
          <SummaryItem>
            <SummaryValue>{formatNumber(totalUnits)}</SummaryValue>
            <SummaryLabel>Total Units to Sell</SummaryLabel>
          </SummaryItem>
          <SummaryItem>
            <SummaryValue>{formatNumber(totalLeads)}</SummaryValue>
            <SummaryLabel>Total Leads Required</SummaryLabel>
          </SummaryItem>
          <SummaryItem>
            <SummaryValue>{formatNumber(totalDoubleLeads)}</SummaryValue>
            <SummaryLabel>Double Leads Strategy</SummaryLabel>
          </SummaryItem>
        </SummaryGrid>
      </SummaryCard>

      <ResultsTable>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>
                Revenue Goal
              </TableHeaderCell>
              <TableHeaderCell>
                Units to Sell
              </TableHeaderCell>
              <TableHeaderCell>
                Target Units
              </TableHeaderCell>
              <TableHeaderCell>
                Leads Required
              </TableHeaderCell>
              <TableHeaderCell>
                Double Leads
              </TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {results.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <ProductName>{product.name}</ProductName>
                  <div style={{ fontSize: '0.75rem', color: '#718096' }}>
                    {product.productValue}% of revenue
                  </div>
                </TableCell>
                <TableCell>
                  <MetricValue>{formatCurrency(product.revenueGoalProduct)}</MetricValue>
                </TableCell>
                <TableCell>
                  <MetricValue>{formatNumber(product.unitsToSell)}</MetricValue>
                </TableCell>
                <TableCell>
                  <MetricValue>{formatNumber(product.targetUnits)}</MetricValue>
                  <MetricLabel>+10% buffer</MetricLabel>
                </TableCell>
                <TableCell>
                  <MetricValue>{formatNumber(product.leadsRequired)}</MetricValue>
                  <MetricLabel>{product.conversionRatio}% conversion</MetricLabel>
                </TableCell>
                <TableCell>
                  <MetricValue>{formatNumber(product.doubleLeads)}</MetricValue>
                  <MetricLabel>Conservative target</MetricLabel>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ResultsTable>
    </Panel>
  );
}

export default ResultsPanel;
