import { metroLines, connections } from '../data/metroData.js';

// 路线规划服务
import { metroLines as lines, connections as conn } from '../data/metroData.js';

class RoutePlannerService {
  constructor() {
    this.metroLines = lines;
    this.connections = conn;
    // 构建站点映射表以提高查询效率
    this.stationMap = this.buildStationMap();
  }

  // 构建站点映射表
  buildStationMap() {
    const stationMap = {};
    Object.values(this.metroLines).forEach(line => {
      line.stations.forEach(station => {
        stationMap[station.id] = {
          ...station,
          lineId: line.id,
          lineName: line.name,
          lineColor: line.color
        };
      });
    });
    return stationMap;
  }

  // 获取所有站点列表
  getAllStations() {
    return Object.values(this.stationMap);
  }

  // 获取地铁线路数据
  getMetroLines() {
    return this.metroLines;
  }

  // 根据站点ID获取站点信息
  getStationById(stationId) {
    return this.stationMap[stationId];
  }

  // 根据站点名称搜索站点
  searchStationsByName(keyword) {
    if (!keyword) return [];
    keyword = keyword.toLowerCase();
    return Object.values(this.stationMap)
      .filter(station => 
        station.name.toLowerCase().includes(keyword) || 
        station.nameZh.toLowerCase().includes(keyword)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  // 根据地点名称搜索地点和站点
  searchLocationsByName(keyword) {
    if (!keyword) return [];
    keyword = keyword.toLowerCase();

    // 这里模拟地点数据，实际应用中应该从数据库或API获取
    const locations = [
      { id: 'location_1', name: '人民广场' },
      { id: 'location_2', name: '南京东路' },
      { id: 'location_3', name: '静安寺' },
      { id: 'location_4', name: '外滩' },
      { id: 'location_5', name: '上海火车站' },
      { id: 'location_6', name: '虹桥火车站' },
      { id: 'location_7', name: '浦东机场' },
      { id: 'location_8', name: '南京西路' },
      { id: 'location_9', name: '徐家汇' },
      { id: 'location_10', name: '世纪大道' }
    ];

    // 搜索地点
    const locationResults = locations
      .filter(location => location.name.toLowerCase().includes(keyword))
      .map(location => ({ ...location, type: 'location' }));

    // 搜索站点
    const stationResults = this.searchStationsByName(keyword)
      .map(station => ({ 
        id: station.id, 
        name: `${station.nameZh} (${station.name})`, 
        type: 'station',
        lineName: station.lineName, 
        lineColor: station.lineColor 
      }));

    // 合并结果并排序（地点在前，站点在后）
    return [...locationResults, ...stationResults]
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  // 根据地点ID查找附近的站点
  findNearbyStations(locationId) {
    // 这里模拟根据地点查找附近站点的逻辑
    // 实际应用中应该使用地理信息系统或API来计算真实距离
    const nearbyStationsMap = {
      'location_1': [1, 2, 3], // 人民广场附近的站点ID
      'location_2': [4, 5],    // 南京东路附近的站点ID
      'location_3': [6, 7, 8], // 静安寺附近的站点ID
      'location_4': [9, 10],   // 外滩附近的站点ID
      'location_5': [11, 12],  // 上海火车站附近的站点ID
      'location_6': [13, 14],  // 虹桥火车站附近的站点ID
      'location_7': [15],      // 浦东机场附近的站点ID
      'location_8': [16, 17],  // 南京西路附近的站点ID
      'location_9': [18, 19, 20], // 徐家汇附近的站点ID
      'location_10': [21, 22, 23] // 世纪大道附近的站点ID
    };

    // 如果是自定义地点（非预设地点），返回随机几个站点
    if (!nearbyStationsMap[locationId]) {
      // 从所有站点中随机选择3个
      const allStationIds = Object.keys(this.stationMap);
      const randomStationIds = [];
      for (let i = 0; i < 3 && i < allStationIds.length; i++) {
        const randomIndex = Math.floor(Math.random() * allStationIds.length);
        randomStationIds.push(allStationIds[randomIndex]);
      }
      return randomStationIds.map(id => ({
        ...this.stationMap[id],
        distance: `${Math.floor(Math.random() * 1500 + 300)}米`,
        walkingTime: `${Math.floor(Math.random() * 15 + 5)}分钟`
      }));
    }

    // 返回预设地点附近的站点
    return nearbyStationsMap[locationId].map(stationId => {
      // 模拟距离和步行时间
      const distance = Math.floor(Math.random() * 1500 + 300);
      return {
        ...this.stationMap[stationId],
        distance: `${distance}米`,
        walkingTime: `${Math.floor(distance / 80)}分钟` // 假设每分钟走80米
      };
    });
  }

  // 实现简化版的Dijkstra算法查找最短路径
  findShortestPath(originId, destinationId, routeType = 'fastest') {
    // 如果起点和终点相同
    if (originId === destinationId) {
      return {
        duration: '0分钟',
        distance: '0公里',
        transfers: 0,
        stations: [this.stationMap[originId]],
        path: [originId]
      };
    }

    // 初始化距离表和前驱表
    const distances = {};
    const previous = {};
    const visited = {};
    const queue = [];

    // 初始化所有站点距离为无穷大
    Object.keys(this.stationMap).forEach(stationId => {
      distances[stationId] = Infinity;
      previous[stationId] = null;
    });

    // 设置起点距离为0
    distances[originId] = 0;
    queue.push({ id: originId, distance: 0 });

    // 当队列不为空时
    while (queue.length > 0) {
      // 按距离排序并取出最近的站点
      queue.sort((a, b) => a.distance - b.distance);
      const { id: currentId } = queue.shift();

      // 如果已访问过，则跳过
      if (visited[currentId]) continue;

      // 标记为已访问
      visited[currentId] = true;

      // 如果到达终点，则结束搜索
      if (currentId === destinationId) break;

      // 查找当前站点的所有邻居
      const neighbors = this.getNeighbors(currentId);

      // 遍历所有邻居
    neighbors.forEach(({ neighborId, lineId }) => {
      // 计算权重 (根据路线类型)
      let weight = 1; // 默认权重
      if (routeType === 'leastTransfers') {
        // 如果换乘，增加权重
        const currentLine = this.stationMap[currentId].lineId;
        // 对于换乘类型的连接，不增加权重
        if (lineId === 'transfer') {
          weight = 1;
        } else {
          weight = currentLine === lineId ? 1 : 5; // 换乘权重更高
        }
      } else if (routeType === 'leastWalking') {
        // 少步行模式下，权重相同
        weight = 1;
      }

      // 计算距离
      const distance = distances[currentId] + weight;

      // 如果找到更短的路径
      if (distance < distances[neighborId]) {
        distances[neighborId] = distance;
        previous[neighborId] = currentId;
        queue.push({ id: neighborId, distance });
      }
    });
    }

    // 构建路径
    const path = [];
    let current = destinationId;
    while (current) {
      path.unshift(current);
      current = previous[current];
    }

    // 如果没有找到路径
    if (path.length === 1 && path[0] === destinationId) {
      console.warn(`No path found from ${originId} to ${destinationId}`);
      return {
        error: 'No route found between the selected stations',
        duration: '0分钟',
        distance: '0公里',
        transfers: 0,
        stations: [],
        path: []
      };
    }

    // 计算换乘次数
    let transfers = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const currentStation = path[i];
      const nextStation = path[i + 1];
      
      // 查找当前站点到下一站的连接
      const connection = this.connections.find(conn => 
        (conn.from === currentStation && conn.to === nextStation) || 
        (conn.from === nextStation && conn.to === currentStation)
      );
      
      // 如果是换乘连接，则增加换乘次数
      if (connection && connection.line === 'transfer') {
        transfers++;
      } else {
        // 如果找不到连接，使用线路变化判断
        const currentLine = this.stationMap[currentStation].lineId;
        const nextLine = this.stationMap[nextStation].lineId;
        if (currentLine !== nextLine) {
          transfers++;
        }
      }
    }

    // 估算距离和时间
    const stationCount = path.length;
    const distance = (stationCount * 1.2).toFixed(1); // 假设平均每个站1.2公里
    const duration = Math.round(stationCount * 3); // 假设平均每个站3分钟

    // 获取站点详细信息
    const stations = path.map(id => this.stationMap[id]);

    return {
      duration: `${duration}分钟`,
      distance: `${distance}公里`,
      transfers,
      stations,
      path
    };
  }

  // 获取站点的所有邻居
  getNeighbors(stationId) {
    const neighbors = [];

    // 查找所有连接
    this.connections.forEach(connection => {
      if (connection.from === stationId) {
        neighbors.push({
          neighborId: connection.to,
          lineId: connection.line
        });
      }
      if (connection.to === stationId) {
        neighbors.push({
          neighborId: connection.from,
          lineId: connection.line
        });
      }
    });

    return neighbors;
  }
}

// 创建单例实例
const routePlannerService = new RoutePlannerService();

export default routePlannerService;