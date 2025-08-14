import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { metroLines, getAllStations } from '../data/metroData.js';

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: white;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
    border-radius: 8px;
  }
`;

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
`;

const MapCanvas = styled.svg`
  width: 100%;
  height: 100%;
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  transition: transform 0.2s ease;
`;

const ZoomControls = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
`;

const ZoomButton = styled.button`
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ResetButton = styled.button`
  position: absolute;
  top: 30px;
  left: 30px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  z-index: 10;
  
  &:hover {
    background: #f8f9fa;
    transform: translateY(-1px);
  }
`;

const Station = styled.circle`
  fill: white;
  stroke: #333;
  cursor: pointer;
  transition: transform 0.2s ease, fill 0.2s ease;
  transform-origin: center;
  
  &:hover {
    fill: #e3f2fd;
    transform: scale(1.25);
  }
`;

const StationLabel = styled.text`
  font-size: 6px;
  font-weight: 500;
  text-anchor: middle;
  pointer-events: none;
  fill: #333;
  paint-order: stroke;
  stroke: #fff;
  stroke-width: 0.3px;
`;

const LineLabel = styled.text`
  font-size: 8px;
  font-weight: bold;
  text-anchor: middle;
  fill: #333;
  paint-order: stroke;
  stroke: #fff;
  stroke-width: 0.3px;
`;

const MetroMap = ({ selectedRoute, onStationClick }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
  const [showImage, setShowImage] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    resetView();
  }, []);

  // 处理鼠标滚轮缩放
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.5, Math.min(3, transform.scale * delta));
    
    // 计算鼠标位置相对于容器的坐标
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // 计算新的偏移，使缩放以鼠标位置为中心
    const newX = mouseX - (mouseX - transform.x) * (newScale / transform.scale);
    const newY = mouseY - (mouseY - transform.y) * (newScale / transform.scale);
    
    setTransform({ x: newX, y: newY, scale: newScale });
  }, [transform]);

  // 处理鼠标按下
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // 只响应左键点击
    setIsDragging(true);
    setStartDragPos({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  // 处理鼠标移动
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startDragPos.x;
    const deltaY = e.clientY - startDragPos.y;
    setTransform({ ...transform, x: deltaX, y: deltaY });
  };

  // 处理鼠标松开
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 处理鼠标离开
  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 缩放控制
  const zoomIn = () => {
    const newScale = Math.min(3, transform.scale * 1.2);
    setTransform({ ...transform, scale: newScale });
  };

  const zoomOut = () => {
    const newScale = Math.max(0.5, transform.scale / 1.2);
    setTransform({ ...transform, scale: newScale });
  };

  const resetView = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  const toggleView = () => {
    setShowImage(!showImage);
  };

  const renderLines = () => {
    return Object.values(metroLines).map(line => {
      return line.stations.map((station, index) => {
        if (index < line.stations.length - 1) {
          const nextStation = line.stations[index + 1];
          return (
            <line
              key={`${line.id}-${station.id}-${nextStation.id}`}
              x1={`${station.x}%`}
              y1={`${station.y}%`}
              x2={`${nextStation.x}%`}
              y2={`${nextStation.y}%`}
              stroke={line.color}
              strokeWidth="1"
              strokeLinecap="round"
            />
          );
        }
        return null;
      });
    });
  };

  const renderStations = () => {
    return Object.values(metroLines).map(line => {
      return line.stations.map(station => {
        const isInRoute = Array.isArray(selectedRoute) && selectedRoute.includes(station.id);
        const isHighlighted = isInRoute;
        
        return (
          <g key={`${line.id}-${station.id}`}>
            <Station
              cx={`${station.x}%`}
              cy={`${station.y}%`}
              r={isHighlighted ? 1.6 : 1.2}
              fill={isInRoute ? line.color : 'white'}
              stroke={isInRoute ? line.color : '#333'}
              strokeWidth={isHighlighted ? 1 : 0.6}
              onClick={() => onStationClick && onStationClick(station)}
            />
            <StationLabel
              x={`${station.x}%`}
              y={`${station.y - 1.2}%`}
            >
              {station.nameZh}
            </StationLabel>
          </g>
        );
      });
    });
  };

  const renderLineLabels = () => {
    return Object.values(metroLines).map(line => {
      if (line.stations.length > 0) {
        const midStation = line.stations[Math.floor(line.stations.length / 2)];
        return (
          <LineLabel
            key={`label-${line.id}`}
            x={`${midStation.x}%`}
            y={`${midStation.y}%`}
          >
            {line.name}
          </LineLabel>
        );
      }
      return null;
    });
  };

  const renderSelectedRoute = () => {
    if (!selectedRoute || selectedRoute.length < 2) return null;
    
    return selectedRoute.map((stationId, index) => {
      if (index < selectedRoute.length - 1) {
        const currentStation = getAllStations().find(s => s.id === stationId);
        const nextStation = getAllStations().find(s => s.id === selectedRoute[index + 1]);
        
        if (currentStation && nextStation) {
          return (
            <line
              key={`route-${stationId}-${nextStation.id}`}
              x1={`${currentStation.x}%`}
              y1={`${currentStation.y}%`}
              x2={`${nextStation.x}%`}
              y2={`${nextStation.y}%`}
              stroke="#FFD700"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="2,1"
              opacity="0.8"
            />
          );
        }
      }
      return null;
    });
  };

  return (
    <MapContainer
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <ZoomControls>
        <ZoomButton onClick={zoomIn}>+</ZoomButton>
        <ZoomButton onClick={zoomOut}>−</ZoomButton>
      </ZoomControls>
      
      <ResetButton onClick={resetView}>重置视图</ResetButton>
      
      <button 
        onClick={toggleView}
        style={{
          position: 'absolute',
          top: '30px',
          left: '120px',
          padding: '8px 16px',
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 10
        }}
      >
        {showImage ? '显示线路图' : '显示原图'}
      </button>
      
      {showImage ? (
        <MapImage 
          src="/xianlu.jpg" 
          alt="地铁线路图"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: '0 0'
          }}
        />
      ) : (
        <MapCanvas 
          viewBox="0 0 100 125" 
          preserveAspectRatio="xMidYMid meet"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: '0 0'
          }}
        >
          {/* 背景网格 */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e0e0e0" strokeWidth="0.2"/>
            </pattern>
          </defs>
          <rect width="100" height="125" fill="url(#grid)" />
          
          {/* 地铁线路 */}
          {renderLines()}
          
          {/* 选中的路线放在站点之下，防止遮挡点击 */}
          {renderSelectedRoute()}
          
          {/* 站点 */}
          {renderStations()}
          
          {/* 线路标签 */}
          {renderLineLabels()}
        </MapCanvas>
      )}
    </MapContainer>
  );
};

export default MetroMap;
