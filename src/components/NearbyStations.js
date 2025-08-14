import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllStations, metroLines } from '../data/metroData.js';

const NearbyContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const NearbyTitle = styled.h2`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const SearchContainer = styled.div`
  margin-bottom: 24px;
  position: relative;
`;

const SearchInput = styled.input`
  width: calc(100% - 32px);
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
`;

const ResultItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const NoResults = styled.div`
  padding: 16px;
  text-align: center;
  color: #666;
`;

const StationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StationItem = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #2196f3;
    box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);
  }
`;

const StationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const StationName = styled.h3`
  margin: 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
`;

const StationLine = styled.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
`;

const StationNameEn = styled.div`
  font-size: 14px;
  color: #666;
`;

const NearbyStations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [nearbyStations, setNearbyStations] = useState([]);
  const [allStations, setAllStations] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // 获取所有站点数据
    const stations = getAllStations();
    setAllStations(stations);
    
    // 默认显示前5个站点作为示例
    setNearbyStations(stations.slice(0, 5));
  }, []);

  // 处理搜索输入变化
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = allStations.filter(station => {
      const matchesName = station.name.toLowerCase().includes(term);
      const matchesNameZh = station.nameZh.toLowerCase().includes(term);
      return matchesName || matchesNameZh;
    });

    setSearchResults(results);
    setShowResults(true);
  }, [searchTerm, allStations]);

  // 处理选择地点
  const handleSelectLocation = (station) => {
    // 在实际应用中，这里可以根据用户选择的地点计算附近的站点
    // 作为示例，我们简单地显示该站点及其相邻站点
    
    // 获取该站点所在的线路
    const lines = Object.values(metroLines || {});
    const stationLines = lines.filter(line => 
      line.stations.some(s => s.id === station.id)
    );
    
    // 获取相邻站点
    const nearby = [];
    stationLines.forEach(line => {
      const stationIndex = line.stations.findIndex(s => s.id === station.id);
      if (stationIndex > 0) {
        nearby.push({
          ...line.stations[stationIndex - 1],
          lineName: line.name,
          lineColor: line.color
        });
      }
      if (stationIndex < line.stations.length - 1) {
        nearby.push({
          ...line.stations[stationIndex + 1],
          lineName: line.name,
          lineColor: line.color
        });
      }
    });
    
    // 添加当前站点
    if (stationLines.length > 0) {
      const firstLine = stationLines[0];
      nearby.unshift({
        ...station,
        lineName: firstLine.name,
        lineColor: firstLine.color
      });
    }
    
    setNearbyStations(nearby);
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <NearbyContainer>
      <NearbyTitle>附近站点</NearbyTitle>
      
      {/* 搜索框 */}
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="搜索地点..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
        
        {/* 搜索结果 */}
        {showResults && (
          <SearchResults>
            {searchResults.length > 0 ? (
              // 按站点ID分组，显示所有线路
              Array.from(
                searchResults.reduce((acc, station) => {
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
                <div key={stationId}>
                  {stationLines.map((station, index) => (
                    <ResultItem 
                      key={`${station.id}-${index}`}
                      onClick={() => handleSelectLocation(station)}
                    >
                      <strong style={{ color: station.lineColor }}>{station.lineName}</strong> - {station.nameZh} ({station.name})
                    </ResultItem>
                  ))}
                </div>
              ))
            ) : (
              searchTerm.trim() ? (
                <NoResults>没有找到匹配的地点</NoResults>
              ) : null
            )}
          </SearchResults>
        )}
      </SearchContainer>
      
      {/* 附近站点列表 */}
      <StationList>
        {nearbyStations.map((station, index) => (
          <StationItem key={`${station.id}-${index}`}>
            <StationHeader>
              <StationName>{station.nameZh}</StationName>
              <StationLine style={{ background: station.lineColor }}>
                {station.lineName}
              </StationLine>
            </StationHeader>
            <StationNameEn>{station.name}</StationNameEn>
          </StationItem>
        ))}
      </StationList>
    </NearbyContainer>
  );
};

export default NearbyStations;