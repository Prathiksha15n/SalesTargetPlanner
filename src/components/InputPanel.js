import React from 'react';
import styled from 'styled-components';
import { FaPlus, FaTrash, FaCalculator, FaInfoCircle } from 'react-icons/fa';
import ProductForm from './ProductForm';
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

const RevenueGoalSection = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &:invalid {
    border-color: #e53e3e;
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const TooltipIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  cursor: help;
`;

const ProductsSection = styled.div`
  margin-bottom: 2rem;
`;

const ProductsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AddButton = styled(Button)`
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
  }
`;

const CalculateButton = styled(Button)`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem 2rem;
  font-size: 1rem;
  width: 100%;
  justify-content: center;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #feb2b2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

const SuccessMessage = styled.div`
  background: #c6f6d5;
  color: #38a169;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #9ae6b4;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

function InputPanel({
  revenueGoal,
  setRevenueGoal,
  products,
  updateProduct,
  addProduct,
  removeProduct,
  calculateResults
}) {
  const handleRevenueGoalChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
      setRevenueGoal(value);
    }
  };

  // Calculate total product value percentage
  const totalProductValue = products.reduce((sum, product) => {
    const value = parseFloat(product.productValue) || 0;
    return sum + value;
  }, 0);

  const isProductValueValid = totalProductValue === 100;
  const hasAllRequiredFields = revenueGoal && products.every(p => 
    p.productValue && p.salesRatio && p.price && p.conversionRatio
  );

  const canCalculate = hasAllRequiredFields && isProductValueValid;

  return (
    <Panel>
      <PanelTitle>Sales Input Parameters</PanelTitle>
      
      <RevenueGoalSection>
        <Label htmlFor="revenue-goal">
          Revenue Goal (₹)
          <Tooltip content="Enter your total revenue target for the planning period">
            <FaInfoCircle style={{ marginLeft: '0.5rem', color: '#a0aec0' }} />
          </Tooltip>
        </Label>
        <InputGroup>
          <Input
            id="revenue-goal"
            type="number"
            value={revenueGoal}
            onChange={handleRevenueGoalChange}
            placeholder="Enter revenue goal (e.g., 1000000)"
            min="0"
            step="0.01"
            required
          />
          <TooltipIcon>
            <FaInfoCircle />
          </TooltipIcon>
        </InputGroup>
      </RevenueGoalSection>

      <ProductsSection>
        <Label>Products Configuration</Label>
        <ProductActions>
          <AddButton onClick={addProduct}>
            <FaPlus />
            Add Product
          </AddButton>
        </ProductActions>
        
        <ProductsList>
          {products.map((product, index) => (
            <ProductForm
              key={product.id}
              product={product}
              index={index}
              updateProduct={updateProduct}
              removeProduct={removeProduct}
              totalProductValue={totalProductValue}
            />
          ))}
        </ProductsList>
      </ProductsSection>

      {/* Validation Messages */}
      {products.some(p => p.productValue) && !isProductValueValid && (
        <ErrorMessage>
          ⚠️ Total Product Value must add up to 100%. Current total: {totalProductValue.toFixed(1)}%
        </ErrorMessage>
      )}
      
      {isProductValueValid && products.some(p => p.productValue) && (
        <SuccessMessage>
          ✅ Product Value percentages total 100% - Ready to calculate!
        </SuccessMessage>
      )}

      <CalculateButton onClick={calculateResults} disabled={!canCalculate}>
        <FaCalculator />
        Calculate Sales Targets
      </CalculateButton>
    </Panel>
  );
}

export default InputPanel;
