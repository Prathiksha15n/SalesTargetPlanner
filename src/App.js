import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ResultsPanel from './components/ResultsPanel';
import ExportPanel from './components/ExportPanel';
import ChartPanel from './components/ChartPanel';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', sans-serif;
`;

const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

function App() {
  const [revenueGoal, setRevenueGoal] = useState('');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product A',
      productValue: '',
      salesRatio: '',
      price: '',
      conversionRatio: ''
    },
    {
      id: 2,
      name: 'Product B',
      productValue: '',
      salesRatio: '',
      price: '',
      conversionRatio: ''
    },
    {
      id: 3,
      name: 'Product C',
      productValue: '',
      salesRatio: '',
      price: '',
      conversionRatio: ''
    }
  ]);
  const [results, setResults] = useState(null);
  const [showCharts, setShowCharts] = useState(false);

  const calculateResults = useCallback(() => {
    // Validation is now handled in InputPanel component

    const calculatedResults = products.map(product => {
      const revenueGoalProduct = (parseFloat(revenueGoal) * parseFloat(product.productValue)) / 100;
      const unitsToSell = revenueGoalProduct / parseFloat(product.price);
      const targetUnits = unitsToSell * 1.1; // 10% buffer
      const leadsRequired = unitsToSell / (parseFloat(product.conversionRatio) / 100);
      const doubleLeads = leadsRequired * 2;

      return {
        ...product,
        revenueGoalProduct,
        unitsToSell,
        targetUnits,
        leadsRequired,
        doubleLeads
      };
    });

    setResults(calculatedResults);
  }, [revenueGoal, products]);

  const addProduct = useCallback(() => {
    const newProduct = {
      id: Date.now(),
      name: `Product ${String.fromCharCode(65 + products.length)}`,
      productValue: '',
      salesRatio: '',
      price: '',
      conversionRatio: ''
    };
    setProducts(prev => [...prev, newProduct]);
  }, [products.length]);

  const removeProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateProduct = useCallback((id, field, value) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  }, []);

  return (
    <AppContainer>
      <Header />
      <MainContent>
        <LeftPanel>
          <InputPanel
            revenueGoal={revenueGoal}
            setRevenueGoal={setRevenueGoal}
            products={products}
            updateProduct={updateProduct}
            addProduct={addProduct}
            removeProduct={removeProduct}
            calculateResults={calculateResults}
          />
        </LeftPanel>
        <RightPanel>
          <ResultsPanel results={results} />
          {results && (
            <>
              <ExportPanel results={results} revenueGoal={revenueGoal} />
              <ChartPanel 
                results={results} 
                showCharts={showCharts}
                setShowCharts={setShowCharts}
              />
            </>
          )}
        </RightPanel>
      </MainContent>
    </AppContainer>
  );
}

export default App;
