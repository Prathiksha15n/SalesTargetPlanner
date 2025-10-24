import React from 'react';
import styled from 'styled-components';
import { FaDownload, FaFileCsv, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const PanelTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExportButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #4a5568;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  
  &:hover {
    border-color: #667eea;
    color: #667eea;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }
`;

const CSVButton = styled(ExportButton)`
  &:hover {
    border-color: #48bb78;
    color: #48bb78;
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.15);
  }
`;

const PDFButton = styled(ExportButton)`
  &:hover {
    border-color: #e53e3e;
    color: #e53e3e;
    box-shadow: 0 4px 12px rgba(229, 62, 62, 0.15);
  }
`;

function ExportPanel({ results, revenueGoal }) {
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

  const exportToCSV = () => {
    const headers = [
      'Product',
      'Product Value (%)',
      'Sales Ratio (%)',
      'Price',
      'Conversion Ratio (%)',
      'Revenue Goal',
      'Units to Sell',
      'Target Units',
      'Leads Required',
      'Double Leads'
    ];

    const csvData = results.map(product => [
      product.name,
      product.productValue,
      product.salesRatio,
      product.price,
      product.conversionRatio,
      product.revenueGoalProduct,
      product.unitsToSell,
      product.targetUnits,
      product.leadsRequired,
      product.doubleLeads
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sales-target-plan-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = async () => {
    const pdf = new jsPDF('l', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Add title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Sales Target Planner - Results', 20, 30);
    
    // Add date
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 40);
    pdf.text(`Revenue Goal: ${formatCurrency(revenueGoal)}`, 20, 50);
    
    // Add summary
    const totalRevenueGoal = results.reduce((sum, product) => sum + product.revenueGoalProduct, 0);
    const totalUnits = results.reduce((sum, product) => sum + product.unitsToSell, 0);
    const totalLeads = results.reduce((sum, product) => sum + product.leadsRequired, 0);
    const totalDoubleLeads = results.reduce((sum, product) => sum + product.doubleLeads, 0);
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Summary', 20, 70);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Total Revenue Goal: ${formatCurrency(totalRevenueGoal)}`, 20, 80);
    pdf.text(`Total Units to Sell: ${formatNumber(totalUnits)}`, 20, 90);
    pdf.text(`Total Leads Required: ${formatNumber(totalLeads)}`, 20, 100);
    pdf.text(`Double Leads Strategy: ${formatNumber(totalDoubleLeads)}`, 20, 110);
    
    // Add table
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Product Details', 20, 130);
    
    // Table headers
    const headers = ['Product', 'Revenue Goal', 'Units', 'Target Units', 'Leads', 'Double Leads'];
    const colWidths = [30, 35, 25, 30, 25, 30];
    let x = 20;
    
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    headers.forEach((header, index) => {
      pdf.text(header, x, 140);
      x += colWidths[index];
    });
    
    // Table data
    let y = 150;
    pdf.setFont('helvetica', 'normal');
    results.forEach((product, index) => {
      if (y > pageHeight - 20) {
        pdf.addPage();
        y = 20;
      }
      
      x = 20;
      const rowData = [
        product.name,
        formatCurrency(product.revenueGoalProduct),
        formatNumber(product.unitsToSell),
        formatNumber(product.targetUnits),
        formatNumber(product.leadsRequired),
        formatNumber(product.doubleLeads)
      ];
      
      rowData.forEach((data, colIndex) => {
        pdf.text(data, x, y);
        x += colWidths[colIndex];
      });
      
      y += 10;
    });
    
    // Save the PDF
    pdf.save(`sales-target-plan-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <Panel>
      <PanelTitle>
        <FaDownload />
        Export Results
      </PanelTitle>
      <ExportButtons>
        <CSVButton onClick={exportToCSV}>
          <FaFileCsv />
          Export CSV
        </CSVButton>
        <PDFButton onClick={exportToPDF}>
          <FaFilePdf />
          Export PDF
        </PDFButton>
      </ExportButtons>
    </Panel>
  );
}

export default ExportPanel;
