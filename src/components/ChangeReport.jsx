import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react'

function ChangeReport() {
  const [activeTab, setActiveTab] = useState('week')
  const [dateRange, setDateRange] = useState({ start: '2026-04-01', end: '2026-04-21' })
  const [selectedSystem, setSelectedSystem] = useState('all')
  const [selectedDept, setSelectedDept] = useState('all')

  // 统计卡片数据 - 专注于变更报告
  const statCards = [
    {
      title: '变更总数',
      value: '1,248',
      compare: '较上月',
      change: 124,
      changeType: 'up',
      color: '#3b82f6',
      bgColor: '#3b82f6',
      icon: 'fa-exchange-alt'
    },
    {
      title: '变更成功率',
      value: '98.2%',
      compare: '较上月',
      change: 0.8,
      changeType: 'up',
      color: '#10b981',
      bgColor: '#10b981',
      icon: 'fa-check-circle'
    },
    {
      title: '变更失败率',
      value: '1.8%',
      compare: '较上月',
      change: 0.3,
      changeType: 'down',
      color: '#ef4444',
      bgColor: '#ef4444',
      icon: 'fa-times-circle'
    },
    {
      title: '紧急变更',
      value: '42',
      compare: '较上月',
      change: 5,
      changeType: 'up',
      color: '#f59e0b',
      bgColor: '#f59e0b',
      icon: 'fa-exclamation-triangle'
    },
    {
      title: '平均变更时长',
      value: '4.2h',
      compare: '较上月',
      change: -0.6,
      changeType: 'down',
      color: '#8b5cf6',
      bgColor: '#8b5cf6',
      icon: 'fa-clock'
    },
    {
      title: '变更回退数',
      value: '18',
      compare: '较上月',
      change: 2,
      changeType: 'up',
      color: '#ec4899',
      bgColor: '#ec4899',
      icon: 'fa-undo'
    }
  ]

  // 变更趋势图配置
  const trendChartOption = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>{a}: {c}个'
    },
    legend: {
      data: ['变更总数', '成功变更', '失败变更'],
      top: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '15%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['4月1日', '4月3日', '4月5日', '4月7日', '4月9日', '4月11日', '4月13日', '4月15日', '4月17日', '4月19日', '4月21日'],
      axisLine: { lineStyle: { color: '#e5e7eb' } }
    },
    yAxis: {
      type: 'value',
      max: 120,
      interval: 20,
      splitLine: { lineStyle: { color: '#f3f4f6' } }
    },
    series: [
      {
        name: '变更总数',
        data: [45, 52, 68, 74, 78, 70, 85, 92, 88, 95, 102],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#3b82f6',
          width: 2
        },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: '成功变更',
        data: [44, 51, 67, 73, 77, 69, 84, 91, 87, 94, 100],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#10b981',
          width: 2
        },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: '失败变更',
        data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#ef4444',
          width: 2
        },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  }

  // 变更类型分布图配置
  const typeChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}个 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      formatter: '{b} {d}%'
    },
    series: [{
      type: 'pie',
      radius: ['50%', '75%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: false,
      data: [
        { value: 560, name: '基础设施变更', itemStyle: { color: '#3b82f6' } },
        { value: 320, name: '应用发布', itemStyle: { color: '#10b981' } },
        { value: 180, name: '配置变更', itemStyle: { color: '#f59e0b' } },
        { value: 98, name: '数据变更', itemStyle: { color: '#8b5cf6' } },
        { value: 90, name: '安全变更', itemStyle: { color: '#ef4444' } }
      ],
      label: {
        show: false
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }

  // 变更状态分布图配置
  const statusChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}个 ({d}%)'
    },
    series: [{
      type: 'pie',
      radius: ['50%', '75%'],
      center: ['50%', '50%'],
      data: [
        { value: 732, name: '成功', itemStyle: { color: '#10b981' } },
        { value: 13, name: '失败', itemStyle: { color: '#ef4444' } },
        { value: 28, name: '进行中', itemStyle: { color: '#3b82f6' } },
        { value: 45, name: '已计划', itemStyle: { color: '#8b5cf6' } },
        { value: 65, name: '待审批', itemStyle: { color: '#f59e0b' } },
        { value: 165, name: '已关闭', itemStyle: { color: '#94a3b8' } }
      ],
      label: {
        formatter: '{b}\n{d}%',
        fontSize: 11
      },
      labelLine: {
        length: 15,
        length2: 20
      }
    }]
  }

  // 变更时间段分布图配置
  const timeChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['00:00-04:00', '04:00-08:00', '08:00-12:00', '12:00-16:00', '16:00-20:00', '20:00-24:00'],
      axisLine: { lineStyle: { color: '#e5e7eb' } }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#f3f4f6' } }
    },
    series: [{
      data: [45, 120, 280, 210, 180, 75],
      type: 'bar',
      itemStyle: {
        color: '#3b82f6'
      },
      barWidth: '60%'
    }]
  }

  // 模拟变更数据表格
  const changeData = [
    { id: 'CHG-20260421-001', type: '应用发布', status: '成功', duration: '3.2h', system: '核心银行系统', dept: '研发中心', date: '2026-04-21' },
    { id: 'CHG-20260420-002', type: '基础设施变更', status: '成功', duration: '5.1h', system: '网络系统', dept: '基础设施部', date: '2026-04-20' },
    { id: 'CHG-20260419-003', type: '配置变更', status: '失败', duration: '2.5h', system: '中间件平台', dept: '平台部', date: '2026-04-19' },
    { id: 'CHG-20260418-004', type: '数据变更', status: '成功', duration: '4.8h', system: '数据库集群', dept: '数据部', date: '2026-04-18' },
    { id: 'CHG-20260417-005', type: '安全变更', status: '成功', duration: '6.3h', system: '安全网关', dept: '安全部', date: '2026-04-17' },
    { id: 'CHG-20260416-006', type: '应用发布', status: '成功', duration: '2.9h', system: '移动银行', dept: '研发中心', date: '2026-04-16' }
  ]

  const handleDateChange = (field, value) => {
    setDateRange({ ...dateRange, [field]: value })
  }

  const handleSearch = () => {
    alert(`生成报告: ${dateRange.start} 至 ${dateRange.end}, 系统: ${selectedSystem}, 部门: ${selectedDept}`)
  }

  const handleExport = () => {
    alert('导出变更报告数据')
  }

  const systemOptions = [
    { value: 'all', label: '全部业务系统' },
    { value: 'core', label: '核心银行系统' },
    { value: 'network', label: '网络系统' },
    { value: 'middleware', label: '中间件平台' },
    { value: 'mobile', label: '移动银行' }
  ]

  const deptOptions = [
    { value: 'all', label: '全部部门' },
    { value: 'dev', label: '研发中心' },
    { value: 'infra', label: '基础设施部' },
    { value: 'platform', label: '平台部' },
    { value: 'security', label: '安全部' }
  ]

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
              className={`tab-btn ${activeTab === 'quarter' ? 'active' : ''}`}
              onClick={() => setActiveTab('quarter')}
            >
              本季度
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
              type="date"
              value={dateRange.start}
              onChange={(e) => handleDateChange('start', e.target.value)}
            />
            <span className="separator">—</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => handleDateChange('end', e.target.value)}
            />
          </div>

          <select
            className="select-filter"
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value)}
          >
            {systemOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <select
            className="select-filter"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            {deptOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="toolbar-right">
          <button className="btn-search" onClick={handleSearch}>
            <i className="fas fa-chart-line"></i> 生成报告
          </button>
          <button className="btn-export" onClick={handleExport}>
            <i className="fas fa-download"></i> 导出报告
          </button>
        </div>
      </div>

      {/* 统计卡片 - 2行布局 */}
      <div className="stat-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {statCards.map((card, index) => (
          <div key={index} className="stat-card">
            <div className="stat-card-icon" style={{ backgroundColor: card.bgColor }}>
              <i className={`fas ${card.icon}`}></i>
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

      {/* 变更趋势图表 */}
      <div className="chart-section">
        <div className="section-title">
          <span className="title-bar"></span>
          <h3>变更趋势分析</h3>
          <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#95a5a6' }}>
            统计周期: {dateRange.start} 至 {dateRange.end}
          </span>
        </div>
        <ReactECharts option={trendChartOption} style={{ height: 320 }} />
      </div>

      {/* 分布分析图表 */}
      <div className="chart-section">
        <div className="section-title">
          <span className="title-bar"></span>
          <h3>变更分布分析</h3>
        </div>

        <div className="distribution-charts">
          <div className="chart-item">
            <h4>变更类型分布</h4>
            <ReactECharts option={typeChartOption} style={{ height: 280 }} />
          </div>

          <div className="chart-item">
            <h4>变更状态分布</h4>
            <ReactECharts option={statusChartOption} style={{ height: 280 }} />
          </div>

          <div className="chart-item">
            <h4>变更时间段分布</h4>
            <ReactECharts option={timeChartOption} style={{ height: 280 }} />
          </div>
        </div>
      </div>

      {/* 变更数据表格 */}
      <div className="chart-section">
        <div className="section-title">
          <span className="title-bar"></span>
          <h3>变更详情列表</h3>
        </div>

        <div className="tickets-table-wrapper" style={{ marginTop: '16px' }}>
          <table className="tickets-table">
            <thead>
              <tr>
                <th>变更ID</th>
                <th>变更类型</th>
                <th>状态</th>
                <th>变更时长</th>
                <th>业务系统</th>
                <th>负责部门</th>
                <th>变更日期</th>
              </tr>
            </thead>
            <tbody>
              {changeData.map(item => (
                <tr key={item.id}>
                  <td className="ticket-id-cell">{item.id}</td>
                  <td>
                    <span className="type-badge">
                      {item.type}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${
                      item.status === '成功' ? 'status-completed' :
                      item.status === '失败' ? 'status-resolved' : 'status-in-progress'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.duration}</td>
                  <td>{item.system}</td>
                  <td>{item.dept}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 报告摘要 */}
      <div className="chart-section">
        <div className="section-title">
          <span className="title-bar"></span>
          <h3>报告摘要</h3>
        </div>
        <div style={{ padding: '16px', backgroundColor: '#f8f9fb', borderRadius: '8px' }}>
          <p style={{ margin: '0', lineHeight: '1.6', color: '#4a5568' }}>
            在统计周期内（{dateRange.start} 至 {dateRange.end}），共执行变更 <strong>1,248</strong> 次，
            成功率为 <strong>98.2%</strong>，较上月提升 <strong>0.8%</strong>。
            紧急变更共计 <strong>42</strong> 次，平均变更时长为 <strong>4.2小时</strong>。
            变更主要集中在工作日白天时段，其中应用发布和基础设施变更为主要变更类型。
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChangeReport