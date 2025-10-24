import React, { useState } from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipContent = styled.div`
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background: #2d3748;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 400;
  white-space: nowrap;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 300px;
  white-space: normal;
  text-align: center;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #2d3748;
  }
  
  ${props => props.position === 'right' && `
    bottom: 50%;
    left: 125%;
    top: 50%;
    transform: translateY(-50%);
    
    &::after {
      top: 50%;
      left: -10px;
      transform: translateY(-50%);
      border-top-color: transparent;
      border-right-color: #2d3748;
    }
  `}
`;

function Tooltip({ children, content, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TooltipContainer
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <TooltipContent position={position}>
          {content}
        </TooltipContent>
      )}
    </TooltipContainer>
  );
}

export default Tooltip;
