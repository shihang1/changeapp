import React from 'react'
import ReactECharts from 'echarts-for-react'

function Overview() {
  // 统计卡片数据
  const statCards = [
    {
      title: '总工单数',
      value: '1,856',
      change: '+12.5%',
      changeType: 'up',
      icon: 'fa-ticket-alt',
      color: '#3a86ff',
      bgColor: 'rgba(58, 134, 255, 0.1)'
    },
    {
      title: '进行中',
      value: '248',
      change: '+8.2%',
      changeType: 'up',
      icon: 'fa-spinner',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    {
      title: '已完成',
      value: '1,428',
      change: '+15.3%',
      changeType: 'up',
      icon: 'fa-check-circle',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    {
      title: '超时工单',
      value: '28',
      change: '-5.6%',
      changeType: 'down',
      icon: 'fa-clock',
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.1)'
    },
    {
      title: '紧急工单',
      value: '42',
      change: '+18.9%',
      changeType: 'up',
      icon: 'fa-exclamation-triangle',
      color: '#ec4899',
      bgColor: 'rgba(236, 72, 153, 0.1)'
    },
    {
      title: '平均处理时长',
      value: '2.4h',
      change: '-0.8h',
      changeType: 'down',
      icon: 'fa-hourglass-half',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)'
    }
  ]

  // 工单趋势图配置
  const trendChartOption = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>{a}: {c}个'
    },
    legend: {
      data: ['新建工单', '完成工单'],
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
      data: ['4月15日', '4月16日', '4月17日', '4月18日', '4月19日', '4月20日', '4月21日'],
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
        name: '新建工单',
        data: [45, 52, 68, 74, 78, 70, 85],
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
        name: '完成工单',
        data: [38, 48, 62, 70, 75, 65, 80],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#10b981',
          width: 2
        },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  }

  // 工单状态分布图配置
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
        { value: 1428, name: '已完成', itemStyle: { color: '#10b981' } },
        { value: 248, name: '进行中', itemStyle: { color: '#f59e0b' } },
        { value: 132, name: '待审批', itemStyle: { color: '#8b5cf6' } },
        { value: 28, name: '已超时', itemStyle: { color: '#ef4444' } },
        { value: 20, name: '已驳回', itemStyle: { color: '#6b7280' } }
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

  // 工单类型分布图配置
  const typeChartOption = {
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
      data: ['基础设施', '应用发布', '配置变更', '安全变更', '数据变更', '故障处理', '资源申请'],
      axisLine: { lineStyle: { color: '#e5e7eb' } }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#f3f4f6' } }
    },
    series: [{
      data: [420, 320, 280, 240, 180, 150, 120],
      type: 'bar',
      itemStyle: {
        color: '#3b82f6'
      },
      barWidth: '60%'
    }]
  }

  // 最近动态数据
  const recentActivities = [
    { id: 1, type: 'completed', text: '工单 #1023 已完成', time: '2 分钟前', user: '系统' },
    { id: 2, type: 'created', text: '新建工单 #1024：资产入库流程', time: '15 分钟前', user: '张三' },
    { id: 3, type: 'assigned', text: '工单 #1019 已分配给 李四', time: '30 分钟前', user: '王五' },
    { id: 4, type: 'commented', text: '工单 #1018 收到新评论', time: '1 小时前', user: '赵六' },
    { id: 5, type: 'updated', text: '工单 #1015 状态更新为进行中', time: '2 小时前', user: '系统' },
    { id: 6, type: 'priority', text: '工单 #1012 优先级调整为紧急', time: '3 小时前', user: '管理员' }
  ]

  // 快速操作
  const quickActions = [
    { id: 1, title: '新建工单', icon: 'fa-plus', color: '#3a86ff', description: '创建新的工单' },
    { id: 2, title: '批量审批', icon: 'fa-check-double', color: '#10b981', description: '批量审批待处理工单' },
    { id: 3, title: '导出报表', icon: 'fa-download', color: '#8b5cf6', description: '导出统计报表' },
    { id: 4, title: '工单搜索', icon: 'fa-search', color: '#f59e0b', description: '快速搜索工单' }
  ]

  return (
    <div className="overview-container">
      {/* 顶部标题区域 */}
      <div className="overview-header">
        <div className="header-content">
          <h2>系统总览</h2>
          <p>工单管理系统全局概览与关键指标</p>
        </div>
        <div className="header-actions">
          <span className="last-update">
            <i className="far fa-clock"></i> 最后更新: 2026-04-21 14:30
          </span>
        </div>
      </div>

      {/* 统计卡片区域 - 2行布局 */}
      <div className="overview-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {statCards.map((card, index) => (
          <div key={index} className="overview-stat-card">
            <div className="stat-icon" style={{ backgroundColor: card.bgColor, color: card.color }}>
              <i className={`fas ${card.icon}`}></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{card.value}</div>
              <div className="stat-label">{card.title}</div>
            </div>
            <div className={`stat-change ${card.changeType === 'up' ? 'up' : 'down'}`}>
              <i className={`fas fa-arrow-${card.changeType === 'up' ? 'up' : 'down'}`}></i>
              {card.change}
            </div>
          </div>
        ))}
      </div>

      {/* 图表区域 */}
      <div className="overview-charts">
        <div className="chart-section">
          <div className="section-title">
            <span className="title-bar" style={{ backgroundColor: '#3b82f6' }}></span>
            <h3>工单趋势分析</h3>
          </div>
          <ReactECharts option={trendChartOption} style={{ height: 280 }} />
        </div>

        <div className="chart-row">
          <div className="chart-section" style={{ flex: 1 }}>
            <div className="section-title">
              <span className="title-bar" style={{ backgroundColor: '#10b981' }}></span>
              <h3>工单状态分布</h3>
            </div>
            <ReactECharts option={statusChartOption} style={{ height: 260 }} />
          </div>

          <div className="chart-section" style={{ flex: 1 }}>
            <div className="section-title">
              <span className="title-bar" style={{ backgroundColor: '#8b5cf6' }}></span>
              <h3>工单类型分布</h3>
            </div>
            <ReactECharts option={typeChartOption} style={{ height: 260 }} />
          </div>
        </div>
      </div>

      {/* 底部区域：快速操作和最近动态 */}
      <div className="overview-bottom">
        <div className="quick-actions-section">
          <div className="section-title">
            <span className="title-bar" style={{ backgroundColor: '#3a86ff' }}></span>
            <h3>快速操作</h3>
          </div>
          <div className="quick-actions-grid">
            {quickActions.map(action => (
              <div key={action.id} className="quick-action-card">
                <div className="action-icon" style={{ backgroundColor: `${action.color}15`, color: action.color }}>
                  <i className={`fas ${action.icon}`}></i>
                </div>
                <div className="action-content">
                  <div className="action-title">{action.title}</div>
                  <div className="action-description">{action.description}</div>
                </div>
                <button className="action-btn">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-activities">
          <div className="section-title">
            <span className="title-bar" style={{ backgroundColor: '#f59e0b' }}></span>
            <h3>最近动态</h3>
            <a href="#" className="view-all">查看全部 <i className="fas fa-arrow-right"></i></a>
          </div>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  <i className={`fas fa-${
                    activity.type === 'completed' ? 'check' :
                    activity.type === 'created' ? 'plus' :
                    activity.type === 'assigned' ? 'user-check' :
                    activity.type === 'commented' ? 'comment' :
                    activity.type === 'updated' ? 'sync' : 'exclamation-circle'
                  }`}></i>
                </div>
                <div className="activity-info">
                  <div className="activity-text">{activity.text}</div>
                  <div className="activity-meta">
                    <span className="activity-time"><i className="far fa-clock"></i> {activity.time}</span>
                    <span className="activity-user"><i className="fas fa-user"></i> {activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
