import React, { useState } from 'react';
import styled from 'styled-components';
import { metroLines } from '../data/metroData.js';

const InfoContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const Title = styled.h2`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 24px;
  font-weight: 600;
`;

const LineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const LineCard = styled.div`
  border: 2px solid ${props => props.color};
  border-radius: 8px;
  padding: 16px;
  background: ${props => `${props.color}10`};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const LineHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const LineBadge = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.color};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
`;

const LineTitle = styled.div`
  flex: 1;
`;

const LineName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const LineNameEn = styled.div`
  font-size: 14px;
  color: #666;
`;

const StationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StationItem = styled.div`
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.color}20;
    border-color: ${props => props.color};
  }
`;

const StationName = styled.div`
  font-weight: 500;
  margin-bottom: 2px;
`;

const StationNameEn = styled.div`
  font-size: 12px;
  color: #666;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

const LineInfo = () => {
  const [expandedLines, setExpandedLines] = useState(new Set());

  const toggleLine = (lineId) => {
    const newExpanded = new Set(expandedLines);
    if (newExpanded.has(lineId)) {
      newExpanded.delete(lineId);
    } else {
      newExpanded.add(lineId);
    }
    setExpandedLines(newExpanded);
  };

  const renderStations = (line) => {
    const isExpanded = expandedLines.has(line.id);
    const displayStations = isExpanded ? line.stations : line.stations.slice(0, 3);
    
    return (
      <>
        <StationList>
          {displayStations.map((station, index) => (
            <StationItem key={station.id} color={line.color}>
              <StationName>{station.nameZh}</StationName>
              <StationNameEn>{station.name}</StationNameEn>
            </StationItem>
          ))}
        </StationList>
        
        {line.stations.length > 3 && (
          <ExpandButton onClick={() => toggleLine(line.id)}>
            {isExpanded ? '收起' : `显示全部 ${line.stations.length} 站`}
          </ExpandButton>
        )}
      </>
    );
  };

  return (
    <InfoContainer>
      <Title>线路信息</Title>
      
      <LineGrid>
        {Object.values(metroLines).map(line => (
          <LineCard key={line.id} color={line.color}>
            <LineHeader>
              <LineBadge color={line.color}>
                {line.name.replace('号线', '')}
              </LineBadge>
              <LineTitle>
                <LineName>{line.name}</LineName>
                <LineNameEn>{line.nameEn}</LineNameEn>
              </LineTitle>
            </LineHeader>
            
            {renderStations(line)}
          </LineCard>
        ))}
      </LineGrid>
    </InfoContainer>
  );
};

export default LineInfo;
