import React from 'react';
import styled from 'styled-components';
import { FaBullseye, FaChartLine } from 'react-icons/fa'; // ✅ Fixed import

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #718096;
  margin: 0.25rem 0 0 0;
  font-weight: 400;
`;

const IconWrapper = styled.div`
  color: #667eea;
  font-size: 1.5rem;
`;

const MethodBadge = styled.div`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <div>
          <Title>
            <IconWrapper>
              <FaBullseye /> {/* ✅ Replaced FaTarget */}
            </IconWrapper>
            Sales Target Planner
          </Title>
          <Subtitle>
            Professional sales planning using the Chunking Method
          </Subtitle>
        </div>
        <MethodBadge>
          <FaChartLine />
          Chunking Method
        </MethodBadge>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
