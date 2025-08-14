import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { metroLines } from '../data/metroData.js';
import routePlannerService from '../utils/routePlanner.js';


const PlannerContainer = styled.div`
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

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 16px;
  align-items: end;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #666;
  margin-bottom: 8px;
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #2196f3;
  }
  
  &:hover {
    border-color: #bdbdbd;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1976d2;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const RouteResult = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #2196f3;
`;

const RouteTitle = styled.h3`
  margin: 0 0 16px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
`;

const RouteSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RouteStep = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
`;

const StepNumber = styled.div`
  width: 24px;
  height: 24px;
  background: #2196f3;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
`;

const StepInfo = styled.div`
  flex: 1;
`;

const StationName = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`;

const LineInfo = styled.div`
  font-size: 12px;
  color: #666;
`;

const LineBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: ${props => props.color};
  color: white;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  margin-right: 8px;
`;

const NoRoute = styled.div`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 40px 20px;
`;

// 新增搜索相关样式组件
const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  margin-right: 4px; /* 解决边框挤压问题 */

  &:focus {
    outline: none;
    border-color: #2196f3;
  }

  &:hover {
    border-color: #bdbdbd;
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  margin-top: -2px;
  border: 2px solid #e0e0e0;
  border-top: none;
`;

const ResultItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  color: #333;
  text-align: left;

  &:hover {
    background-color: #f5f5f5;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

const NoResults = styled.div`
  padding: 10px 16px;
  color: #666;
  text-align: center;
`;



const getStationLine = (stationId) => {
  for (const [lineId, line] of Object.entries(metroLines)) {
    if (line.stations.find(s => s.id === stationId)) {
      return { id: lineId, ...line };
    }
  }
  return null;
};

const getLineBetweenStations = (station1Id, station2Id) => {
  for (const [lineId, line] of Object.entries(metroLines)) {
    const hasStation1 = line.stations.find(s => s.id === station1Id);
    const hasStation2 = line.stations.find(s => s.id === station2Id);
    if (hasStation1 && hasStation2) {
      return line;
    }
  }
  return null;
};

const RoutePlanner = ({ onRouteSelect }) => {
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [route, setRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [stations, setStations] = useState([]);
  const [startSearchTerm, setStartSearchTerm] = useState('');
  const [endSearchTerm, setEndSearchTerm] = useState('');
  const [startResults, setStartResults] = useState([]);
  const [endResults, setEndResults] = useState([]);
  const [showStartResults, setShowStartResults] = useState(false);
  const [showEndResults, setShowEndResults] = useState(false);
  const [nearbyStations, setNearbyStations] = useState([]);

  useEffect(() => {
    // 使用路线规划服务获取所有站点
    setStations(routePlannerService.getAllStations());
    // 默认显示前5个站点作为附近站点示例
    setNearbyStations(routePlannerService.getAllStations().slice(0, 5));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startStation || !endStation) return;

    setIsLoading(true);
    setHasSearched(true);
    
    try {
      // 使用路线规划服务查找路线
      const foundRoute = routePlannerService.findShortestPath(startStation, endStation);
      setRoute(foundRoute ? foundRoute.path : null);
      setIsLoading(false);
      
      if (foundRoute && onRouteSelect) {
        onRouteSelect(foundRoute);
      }
    } catch (error) {
      console.error('路线规划错误:', error);
      setRoute(null);
      setIsLoading(false);
    }
  };

  // 处理搜索输入变化 - 始终显示所有站点
  useEffect(() => {
    const term = startSearchTerm.toLowerCase().trim();
    const results = term
      ? stations.filter(station => {
          const matchesName = station.name.toLowerCase().includes(term);
          const matchesNameZh = station.nameZh.toLowerCase().includes(term);
          return matchesName || matchesNameZh;
        })
      : stations; // 空搜索时显示所有站点

    setStartResults(results);
  }, [startSearchTerm, stations]);

  useEffect(() => {
    const term = endSearchTerm.toLowerCase().trim();
    const results = term
      ? stations.filter(station => {
          const matchesName = station.name.toLowerCase().includes(term);
          const matchesNameZh = station.nameZh.toLowerCase().includes(term);
          return matchesName || matchesNameZh;
        })
      : stations; // 空搜索时显示所有站点

    setEndResults(results);
  }, [endSearchTerm, stations]);

  // 处理选择起点站
  const handleStartStationSelect = (stationId, stationName) => {
    setStartStation(stationId);
    setStartSearchTerm(stationName);
    setShowStartResults(false);
  };

  // 处理选择终点站
  const handleEndStationSelect = (stationId, stationName) => {
    setEndStation(stationId);
    setEndSearchTerm(stationName);
    setShowEndResults(false);
  };

  // 处理选择附近站点
  const handleSelectNearbyStation = (station, isStart = true) => {
    if (isStart) {
      setStartStation(station.id);
      setStartSearchTerm(station.nameZh);
    } else {
      setEndStation(station.id);
      setEndSearchTerm(station.nameZh);
    }
    setShowStartResults(false);
    setShowEndResults(false);
  };

  const renderRouteSteps = () => {
    if (!route || route.length < 2) return null;

    return route.map((stationId, index) => {
      const station = stations.find(s => s.id === stationId);
      const line = getStationLine(stationId);
      const nextStationId = route[index + 1];
      const connectingLine = nextStationId ? getLineBetweenStations(stationId, nextStationId) : null;

      return (
        <RouteStep key={stationId}>
          <StepNumber>{index + 1}</StepNumber>
          <StepInfo>
            <StationName>{station.nameZh}</StationName>
            <LineInfo>
              {line && (
                <LineBadge color={line.color}>{line.name}</LineBadge>
              )}
              {connectingLine && nextStationId && (
                <span>→ {connectingLine.name} → {stations.find(s => s.id === nextStationId)?.nameZh}</span>
              )}
            </LineInfo>
          </StepInfo>
        </RouteStep>
      );
    });
  };

  return (
    <PlannerContainer>
      <Title>路线规划</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>起点站</Label>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="搜索起点站..."
              value={startSearchTerm}
              onChange={(e) => setStartSearchTerm(e.target.value)}
              onFocus={() => setShowStartResults(true)}
              onBlur={() => setTimeout(() => setShowStartResults(false), 200)}
            />
            {showStartResults && (
              <>
                {startResults.length > 0 && (
                  <SearchResults>
                    {/* 按站点ID分组，显示所有线路 */}
                    {Array.from(
                      startResults.reduce((acc, station) => {
                        if (!acc.has(station.id)) {
                          acc.set(station.id, []);
                        }
                        // 获取该站点的所有线路
                        const lines = Object.values(metroLines || {});
                        const stationLines = lines.filter(line => 
                          line.stations.some(s => s.id === station.id)
                        );
                        stationLines.forEach(line => {
                          acc.get(station.id).push({
                            ...station,
                            lineName: line.name,
                            lineColor: line.color
                          });
                        });
                        return acc;
                      }, new Map())
                    ).map(([stationId, stationLines]) => (
                      <div key={`start-${stationId}`}>
                        {stationLines.map((station, index) => (
                          <ResultItem 
                            key={`start-${station.id}-${index}`}
                            onClick={() => handleStartStationSelect(station.id, station.nameZh)}
                          >
                            <strong style={{ color: station.lineColor }}>{station.lineName}</strong> - {station.nameZh} ({station.name})
                          </ResultItem>
                        ))}
                      </div>
                    ))}
                  </SearchResults>
                )}
                {startSearchTerm.trim() && startResults.length === 0 && (
                  <SearchResults>
                    <NoResults>没有找到匹配的站点</NoResults>
                  </SearchResults>
                )}
              </>
            )}
            {showStartResults && startSearchTerm.trim() && startResults.length === 0 && (
              <SearchResults>
                <NoResults>没有找到匹配的站点</NoResults>
              </SearchResults>
            )}
          </SearchContainer>
        </FormGroup>
        <FormGroup>
          <Label>终点站</Label>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="搜索终点站..."
              value={endSearchTerm}
              onChange={(e) => setEndSearchTerm(e.target.value)}
              onFocus={() => setShowEndResults(true)}
              onBlur={() => setTimeout(() => setShowEndResults(false), 200)}
            />
            {showEndResults && (
              <>
                {endResults.length > 0 && (
                  <SearchResults>
                    {/* 按站点ID分组，显示所有线路 */}
                    {Array.from(
                      endResults.reduce((acc, station) => {
                        if (!acc.has(station.id)) {
                          acc.set(station.id, []);
                        }
                        // 获取该站点的所有线路
                        const lines = Object.values(metroLines || {});
                        const stationLines = lines.filter(line => 
                          line.stations.some(s => s.id === station.id)
                        );
                        stationLines.forEach(line => {
                          acc.get(station.id).push({
                            ...station,
                            lineName: line.name,
                            lineColor: line.color
                          });
                        });
                        return acc;
                      }, new Map())
                    ).map(([stationId, stationLines]) => (
                      <div key={`end-${stationId}`}>
                        {stationLines.map((station, index) => (
                          <ResultItem 
                            key={`end-${station.id}-${index}`}
                            onClick={() => handleEndStationSelect(station.id, station.nameZh)}
                          >
                            <strong style={{ color: station.lineColor }}>{station.lineName}</strong> - {station.nameZh} ({station.name})
                          </ResultItem>
                        ))}
                      </div>
                    ))}
                  </SearchResults>
                )}
                {endSearchTerm.trim() && endResults.length === 0 && (
                  <SearchResults>
                    <NoResults>没有找到匹配的站点</NoResults>
                  </SearchResults>
                )}
                {/* 显示附近站点 */}
                {!endSearchTerm.trim() && nearbyStations.length > 0 && (
                  <SearchResults>
                    <div style={{ padding: '8px 16px', fontWeight: '600', color: '#666', borderBottom: '1px solid #eee' }}>
                      附近站点
                    </div>
                    {nearbyStations.map(station => {
                      // 获取该站点的所有线路
                      const lines = Object.values(metroLines || {});
                      const stationLines = lines.filter(line => 
                        line.stations.some(s => s.id === station.id)
                      );
                      
                      return stationLines.map((line, index) => (
                        <ResultItem 
                          key={`nearby-end-${station.id}-${index}`}
                          onClick={() => handleSelectNearbyStation({ ...station, lineName: line.name, lineColor: line.color }, false)}
                        >
                          <strong style={{ color: line.color }}>{line.name}</strong> - {station.nameZh} ({station.name})
                        </ResultItem>
                      ));
                    })}
                  </SearchResults>
                )}
              </>
            )}
            {showEndResults && endSearchTerm.trim() && endResults.length === 0 && (
              <SearchResults>
                <NoResults>没有找到匹配的站点</NoResults>
              </SearchResults>
            )}
          </SearchContainer>
        </FormGroup>
        <Button type="submit" disabled={!startStation || !endStation || isLoading}>
          {isLoading ? '规划中...' : '规划路线'}
        </Button>
      </Form>

      {hasSearched && route && (
        <RouteResult>
          <RouteTitle>
            路线规划结果 ({route.length - 1} 站)
          </RouteTitle>
          <RouteSteps>
            {renderRouteSteps()}
          </RouteSteps>
        </RouteResult>
      )}

      {hasSearched && !isLoading && route === null && (
        <NoRoute>
          未找到从 {stations.find(s => s.id === startStation)?.nameZh} 到 {stations.find(s => s.id === endStation)?.nameZh} 的路线
        </NoRoute>
      )}
    </PlannerContainer>
  );
};

export default RoutePlanner;
