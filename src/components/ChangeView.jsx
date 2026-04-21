import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react'

function ChangeView() {
  const [activeTab, setActiveTab] = useState('week')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  // 统计卡片数据
  const statCards = [
    {
      title: '本周变更数',
      value: '12,256',
      compare: '较上周',
      change: 206,
      changeType: 'up',
      color: '#1a73e8',
      bgColor: '#1a73e8'
    },
    {
      title: '变更成功率',
      value: '98.6%',
      compare: '较上周',
      change: 0.4,
      changeType: 'down',
      color: '#3b82f6',
      bgColor: '#3b82f6'
    },
    {
      title: '变更回滚率',
      value: '5.6%',
      compare: '较上周',
      change: 0.6,
      changeType: 'up',
      color: '#14b8a6',
      bgColor: '#14b8a6'
    },
    {
      title: '紧急变更数',
      value: '30',
      compare: '较上周',
      change: 2,
      changeType: 'down',
      color: '#7c3aed',
      bgColor: '#7c3aed'
    }
  ]

  // 变更单趋势图配置
  const trendChartOption = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2025/10/31', '2025/11/1', '2025/11/2', '2025/11/3', '2025/11/4', '2025/11/5', '2025/11/6'],
      axisLine: { lineStyle: { color: '#e5e7eb' } }
    },
    yAxis: {
      type: 'value',
      max: 250,
      interval: 50,
      splitLine: { lineStyle: { color: '#f3f4f6' } }
    },
    series: [{
      data: [100, 140, 225, 100, 125, 145, 148],
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#3b82f6',
        width: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
          ]
        }
      }
    }]
  }

  // 变更类型分布图配置
  const typeChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '55%'],
      data: [
        { value: 560, name: '常规变更', itemStyle: { color: '#3b82f6' } },
        { value: 30, name: '紧急变更', itemStyle: { color: '#67e8f9' } }
      ],
      label: {
        formatter: '{b}\n{d}',
        fontSize: 11
      },
      labelLine: {
        length: 10,
        length2: 15
      }
    }]
  }

  // 变更级别分布图配置
  const levelChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      formatter: '{b} {d}%'
    },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['35%', '55%'],
      avoidLabelOverlap: false,
      data: [
        { value: 43, name: '简单', itemStyle: { color: '#22c55e' } },
        { value: 43, name: '标准', itemStyle: { color: '#3b82f6' } },
        { value: 8, name: '重要', itemStyle: { color: '#f59e0b' } },
        { value: 4, name: '重大', itemStyle: { color: '#ef4444' } }
      ],
      label: {
        show: false
      }
    }]
  }

  // 变更阶段分布图配置
  const stageChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'center',
      formatter: '{b} {d}%'
    },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['60%', '55%'],
      data: [
        { value: 43, name: '回溯阶段', itemStyle: { color: '#a78bfa' } },
        { value: 21, name: '规划阶段', itemStyle: { color: '#34d399' } },
        { value: 24, name: '审批阶段', itemStyle: { color: '#fbbf24' } },
        { value: 8, name: '实施阶段', itemStyle: { color: '#fb923c' } },
        { value: 4, name: '评估阶段', itemStyle: { color: '#60a5fa' } }
      ],
      label: {
        show: false
      }
    }]
  }

  return (
    <div className="change-view-container">
      {/* 顶部工具栏 */}
      <div className="view-toolbar">
        <div className="toolbar-left">
          <div className="tab-group">
            <button 
              className={`tab-btn ${activeTab === 'today' ? 'active' : ''}`}
              onClick={() => setActiveTab('today')}
            >
              今日
            </button>
            <button 
              className={`tab-btn ${activeTab === 'week' ? 'active' : ''}`}
              onClick={() => setActiveTab('week')}
            >
              本周
            </button>
            <button 
              className={`tab-btn ${activeTab === 'month' ? 'active' : ''}`}
              onClick={() => setActiveTab('month')}
            >
              本月
            </button>
            <button 
              className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
              onClick={() => setActiveTab('custom')}
            >
              自定义
            </button>
          </div>

          <div className="date-range-picker">
            <input 
              type="text" 
              placeholder="开始日期" 
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
            <span className="separator">—</span>
            <input 
              type="text" 
              placeholder="结束日期"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>

          <select className="select-filter">
            <option>业务系统选择</option>
          </select>

          <select className="select-filter">
            <option>规划部门选择</option>
          </select>
        </div>

        <div className="toolbar-right">
          <button className="btn-search">
            <i className="fas fa-search"></i> 搜索
          </button>
          <button className="btn-export">
            导出
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="stat-cards">
        {statCards.map((card, index) => (
          <div key={index} className="stat-card">
            <div className="stat-card-icon" style={{ backgroundColor: card.bgColor }}>
              <i className="far fa-user"></i>
            </div>
            <div className="stat-card-info">
              <div className="stat-card-title">{card.title}</div>
              <div className="stat-card-value">{card.value}</div>
              <div className="stat-card-compare">
                <span>{card.compare}</span>
                <span className={`change-indicator ${card.changeType === 'up' ? 'up' : 'down'}`}>
                  {card.changeType === 'up' ? '↑' : '↓'} {Math.abs(card.change)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 变更单趋势 */}
      <div className="chart-section">
        <div className="section-title">
          <span className="title-bar"></span>
          <h3>变更单趋势</h3>
        </div>
        <ReactECharts option={trendChartOption} style={{ height: 300 }} />
      </div>

      {/* 变更单分布 */}
      <div className="chart-section">
        <div className="section-title">
          <span className="title-bar"></span>
          <h3>变更单分布</h3>
        </div>
        
        <div className="distribution-charts">
          <div className="chart-item">
            <h4>变更类型分布</h4>
            <ReactECharts option={typeChartOption} style={{ height: 280 }} />
          </div>
          
          <div className="chart-item">
            <h4>变更级别分布</h4>
            <ReactECharts option={levelChartOption} style={{ height: 280 }} />
          </div>
          
          <div className="chart-item">
            <h4>变更阶段分布</h4>
            <ReactECharts option={stageChartOption} style={{ height: 280 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeView
