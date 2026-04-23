import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react'

function MyParticipation() {
  const [sortBy, setSortBy] = useState('date')

  const participatedTickets = [
    {
      id: 'TK-001234',
      title: '资产入库流程 - Q2季度盘点',
      role: '审批人',
      status: 'approved',
      date: '2026-04-18',
      lastActivity: '2小时前'
    },
    {
      id: 'TK-001235',
      title: '设备上架方案 - 新机房部署',
      role: '参与者',
      status: 'in-progress',
      date: '2026-04-17',
      lastActivity: '5小时前'
    },
    {
      id: 'TK-001230',
      title: '技术整体方案评审 - 多云架构',
      role: '评审专家',
      status: 'reviewing',
      date: '2026-04-16',
      lastActivity: '1天前'
    },
    {
      id: 'TK-001228',
      title: '自动化管理流程优化',
      role: '执行人',
      status: 'completed',
      date: '2026-04-15',
      lastActivity: '3天前'
    },
    {
      id: 'TK-001220',
      title: '故障处理工单 IM-HQ-20260415-0002',
      role: '协作者',
      status: 'resolved',
      date: '2026-04-14',
      lastActivity: '5天前'
    },
    {
      id: 'TK-001215',
      title: '部署方案生成(灾备)',
      role: '顾问',
      status: 'in-progress',
      date: '2026-04-12',
      lastActivity: '1周前'
    }
  ]

  const getStatusConfig = (status) => {
    const configs = {
      approved: { text: '已批准', class: 'status-approved' },
      'in-progress': { text: '进行中', class: 'status-progress' },
      reviewing: { text: '评审中', class: 'status-reviewing' },
      completed: { text: '已完成', class: 'status-completed' },
      resolved: { text: '已解决', class: 'status-resolved' }
    }
    return configs[status] || configs['in-progress']
  }

  const getRoleBadge = (role) => {
    const roles = {
      '审批人': { class: 'role-approver' },
      '参与者': { class: 'role-participant' },
      '评审专家': { class: 'role-reviewer' },
      '执行人': { class: 'role-executor' },
      '协作者': { class: 'role-collaborator' },
      '顾问': { class: 'role-advisor' }
    }
    return roles[role] || roles['参与者']
  }

  const sortedTickets = [...participatedTickets].sort((a, b) => {
    if (sortBy === 'date') {
      return b.date.localeCompare(a.date)
    }
    if (sortBy === 'lastActivity') {
      return b.lastActivity.localeCompare(a.lastActivity)
    }
    return 0
  })

  // 贡献统计图表数据
  const contributionChartOption = {
    title: {
      text: '每月完成工单数',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>{c} 个工单'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: '工单数'
    },
    series: [
      {
        name: '完成工单',
        type: 'bar',
        data: [12, 15, 8, 10, 14, 18, 22, 20, 16, 12, 9, 7],
        itemStyle: {
          color: '#3a86ff'
        },
        barWidth: '60%'
      }
    ],
    grid: {
      left: '60px',
      right: '40px',
      bottom: '60px',
      top: '60px'
    }
  }

  // 参与时间线图表数据
  const timelineChartOption = {
    title: {
      text: '最近参与活动',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        const param = params[0]
        return `${param.axisValue}<br/>${param.marker} ${param.seriesName}: ${param.value} 次`
      }
    },
    xAxis: {
      type: 'category',
      data: ['4/15', '4/16', '4/17', '4/18', '4/19', '4/20', '4/21', '4/22', '4/23'],
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: '参与次数'
    },
    series: [
      {
        name: '参与活动',
        type: 'line',
        data: [3, 5, 2, 6, 4, 7, 5, 8, 6],
        itemStyle: {
          color: '#ff6b6b'
        },
        lineStyle: {
          width: 3
        },
        symbolSize: 8,
        smooth: true
      }
    ],
    grid: {
      left: '60px',
      right: '40px',
      bottom: '60px',
      top: '60px'
    }
  }

  return (
    <div className="participation-container">
      <div className="participation-header">
        <h2>我参与的</h2>
        <div className="header-actions">
          <div className="sort-control">
            <label>排序方式：</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">按日期</option>
              <option value="lastActivity">按最近活动</option>
            </select>
          </div>
        </div>
      </div>

      <div className="participation-stats">
        <div className="stat-box">
          <div className="stat-value">{participatedTickets.length}</div>
          <div className="stat-label">参与工单总数</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">
            {participatedTickets.filter(t => t.status === 'in-progress').length + 
             participatedTickets.filter(t => t.status === 'reviewing').length}
          </div>
          <div className="stat-label">进行中</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{participatedTickets.filter(t => t.status === 'completed').length}</div>
          <div className="stat-label">已完成</div>
        </div>
      </div>

      {/* 新增图表：贡献统计和参与时间线 */}
      <div className="chart-row">
        <div className="chart-section" style={{ flex: 1 }}>
          <div className="section-title">
            <span className="title-bar" style={{ backgroundColor: '#3a86ff' }}></span>
            <h3>每月完成工单统计</h3>
          </div>
          <ReactECharts option={contributionChartOption} style={{ height: 300 }} />
        </div>
        <div className="chart-section" style={{ flex: 1 }}>
          <div className="section-title">
            <span className="title-bar" style={{ backgroundColor: '#ff6b6b' }}></span>
            <h3>最近参与活动趋势</h3>
          </div>
          <ReactECharts option={timelineChartOption} style={{ height: 300 }} />
        </div>
      </div>

      <div className="ticket-list">
        {sortedTickets.map(ticket => {
          const statusConfig = getStatusConfig(ticket.status)
          const roleConfig = getRoleBadge(ticket.role)
          
          return (
            <div key={ticket.id} className="ticket-item">
              <div className="ticket-id">{ticket.id}</div>
              
              <div className="ticket-info">
                <div className="ticket-title">{ticket.title}</div>
                <div className="ticket-meta">
                  <span className={`role-badge ${roleConfig.class}`}>
                    <i className="fas fa-user-tag"></i> {ticket.role}
                  </span>
                  <span className="ticket-date">
                    <i className="far fa-calendar"></i> 创建于 {ticket.date}
                  </span>
                  <span className="ticket-last-activity">
                    <i className="far fa-clock"></i> {ticket.lastActivity}
                  </span>
                </div>
              </div>
              
              <div className="ticket-status-wrapper">
                <span className={`status-badge ${statusConfig.class}`}>
                  {statusConfig.text}
                </span>
              </div>
              
              <div className="ticket-actions">
                <button className="action-link">查看详情</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyParticipation
