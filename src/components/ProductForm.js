import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrash, FaInfoCircle, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Tooltip from './Tooltip';

const ProductCard = styled.div`
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s;
  
  &:hover {
    border-color: #cbd5e0;
  }
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
  flex: 1;
`;

const ProductNameInput = styled.input`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  border: 2px solid #667eea;
  border-radius: 6px;
  padding: 0.5rem;
  background: white;
  flex: 1;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
`;

const EditButton = styled(ActionButton)`
  background: #e6fffa;
  color: #319795;
  
  &:hover {
    background: #b2f5ea;
  }
`;

const SaveButton = styled(ActionButton)`
  background: #c6f6d5;
  color: #38a169;
  
  &:hover {
    background: #9ae6b4;
  }
`;

const CancelButton = styled(ActionButton)`
  background: #fed7d7;
  color: #c53030;
  
  &:hover {
    background: #feb2b2;
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #fed7d7;
  color: #c53030;
  
  &:hover {
    background: #feb2b2;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
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

const TooltipIcon = styled.div`
  color: #a0aec0;
  cursor: help;
`;

const PercentageIndicator = styled.div`
  font-size: 0.75rem;
  color: ${props => props.isValid ? '#38a169' : '#e53e3e'};
  font-weight: 500;
  margin-top: 0.25rem;
  text-align: center;
`;

function ProductForm({ product, index, updateProduct, removeProduct, totalProductValue }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(product.name);

  const handleChange = (field, value) => {
    // Validation for different field types
    if (field === 'productValue' || field === 'salesRatio' || field === 'conversionRatio') {
      // Percentage fields: 0-100
      if (value === '' || (!isNaN(value) && parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
        updateProduct(product.id, field, value);
      }
    } else if (field === 'price') {
      // Price field: positive numbers
      if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
        updateProduct(product.id, field, value);
      }
    } else {
      updateProduct(product.id, field, value);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditName(product.name);
  };

  const handleSave = () => {
    updateProduct(product.id, 'name', editName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(product.name);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      removeProduct(product.id);
    }
  };

  return (
    <ProductCard>
      <ProductHeader>
        {isEditing ? (
          <ProductNameInput
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
        ) : (
          <ProductTitle>{product.name}</ProductTitle>
        )}
        <ActionButtons>
          {isEditing ? (
            <>
              <SaveButton onClick={handleSave} title="Save changes">
                <FaCheck />
              </SaveButton>
              <CancelButton onClick={handleCancel} title="Cancel editing">
                <FaTimes />
              </CancelButton>
            </>
          ) : (
            <>
              <EditButton onClick={handleEdit} title="Edit product name">
                <FaEdit />
              </EditButton>
              <DeleteButton onClick={handleDelete} title="Delete product">
                <FaTrash />
              </DeleteButton>
            </>
          )}
        </ActionButtons>
      </ProductHeader>
      
      <FormGrid>
        <FormGroup>
          <Label>
            Product Value (% of Revenue)
            <Tooltip content="Percentage of total revenue goal this product should contribute">
              <TooltipIcon>
                <FaInfoCircle />
              </TooltipIcon>
            </Tooltip>
          </Label>
          <Input
            type="number"
            value={product.productValue}
            onChange={(e) => handleChange('productValue', e.target.value)}
            placeholder="e.g., 40"
            min="0"
            max="100"
            step="0.1"
            required
          />
          {product.productValue && (
            <PercentageIndicator isValid={totalProductValue === 100}>
              Total: {totalProductValue.toFixed(1)}% {totalProductValue === 100 ? '✅' : '⚠️'}
            </PercentageIndicator>
          )}
        </FormGroup>
        
        <FormGroup>
          <Label>
            Sales Ratio (Past %)
            <Tooltip content="Historical sales ratio for this product">
              <TooltipIcon>
                <FaInfoCircle />
              </TooltipIcon>
            </Tooltip>
          </Label>
          <Input
            type="number"
            value={product.salesRatio}
            onChange={(e) => handleChange('salesRatio', e.target.value)}
            placeholder="e.g., 35"
            min="0"
            max="100"
            step="0.1"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>
            Product Price (₹)
            <Tooltip content="Unit price of this product">
              <TooltipIcon>
                <FaInfoCircle />
              </TooltipIcon>
            </Tooltip>
          </Label>
          <Input
            type="number"
            value={product.price}
            onChange={(e) => handleChange('price', e.target.value)}
            placeholder="e.g., 1000"
            min="0"
            step="0.01"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>
            Sales Conversion Ratio (%)
            <Tooltip content="Percentage of leads that convert to sales">
              <TooltipIcon>
                <FaInfoCircle />
              </TooltipIcon>
            </Tooltip>
          </Label>
          <Input
            type="number"
            value={product.conversionRatio}
            onChange={(e) => handleChange('conversionRatio', e.target.value)}
            placeholder="e.g., 15"
            min="0"
            max="100"
            step="0.1"
            required
          />
        </FormGroup>
      </FormGrid>
    </ProductCard>
  );
}

export default ProductForm;
