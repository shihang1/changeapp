import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react'

function GroupTodo() {
  const [selectedMember, setSelectedMember] = useState('all')
  
  const members = [
    { id: 'all', name: '全部成员' },
    { id: 'zhangsan', name: '张三' },
    { id: 'lisi', name: '李四' },
    { id: 'wangwu', name: '王五' },
    { id: 'zhaoliu', name: '赵六' }
  ]

  const groupTodos = [
    { id: 1, title: '资产入库流程审批', assignee: 'zhangsan', assigneeName: '张三', status: 'pending', priority: 'high', dueDate: '2026-04-21' },
    { id: 2, title: '设备上架方案审核', assignee: 'lisi', assigneeName: '李四', status: 'in-progress', priority: 'medium', dueDate: '2026-04-22' },
    { id: 3, title: '技术整体方案评审', assignee: 'wangwu', assigneeName: '王五', status: 'pending', priority: 'high', dueDate: '2026-04-23' },
    { id: 4, title: '故障处理工单确认', assignee: 'zhangsan', assigneeName: '张三', status: 'in-progress', priority: 'urgent', dueDate: '2026-04-21' },
    { id: 5, title: '自动化管理流程更新', assignee: 'zhaoliu', assigneeName: '赵六', status: 'completed', priority: 'low', dueDate: '2026-04-20' },
  ]

  // 成员工作负载图表配置
  const memberWorkloadChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}个 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['40%', '50%'],
      data: [
        { value: groupTodos.filter(t => t.assignee === 'zhangsan').length, name: '张三' },
        { value: groupTodos.filter(t => t.assignee === 'lisi').length, name: '李四' },
        { value: groupTodos.filter(t => t.assignee === 'wangwu').length, name: '王五' },
        { value: groupTodos.filter(t => t.assignee === 'zhaoliu').length, name: '赵六' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        formatter: '{b}\n{c}个'
      }
    }]
  }

  // 优先级分布图表配置
  const priorityDistributionChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['紧急', '高', '中', '低']
    },
    yAxis: {
      type: 'value',
      name: '数量'
    },
    series: [{
      data: [
        groupTodos.filter(t => t.priority === 'urgent').length,
        groupTodos.filter(t => t.priority === 'high').length,
        groupTodos.filter(t => t.priority === 'medium').length,
        groupTodos.filter(t => t.priority === 'low').length
      ],
      type: 'bar',
      itemStyle: {
        color: function(params) {
          const colors = ['#ff6b6b', '#ffa726', '#42a5f5', '#66bb6a'];
          return colors[params.dataIndex];
        }
      },
      barWidth: '60%'
    }]
  }

  const filteredTodos = selectedMember === 'all' 
    ? groupTodos 
    : groupTodos.filter(todo => todo.assignee === selectedMember)

  const getPriorityClass = (priority) => {
    const classes = {
      urgent: 'priority-urgent',
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low'
    }
    return classes[priority] || classes.medium
  }

  const getStatusClass = (status) => {
    const classes = {
      pending: 'status-pending',
      'in-progress': 'status-in-progress',
      completed: 'status-completed'
    }
    return classes[status] || classes.pending
  }

  const getStatusText = (status) => {
    const texts = {
      pending: '待处理',
      'in-progress': '进行中',
      completed: '已完成'
    }
    return texts[status] || '未知'
  }

  return (
    <div className="group-todo-container">
      <div className="group-todo-header">
        <h2>组内待办</h2>
        <div className="member-selector">
          <label>成员筛选：</label>
          <select 
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
          >
            {members.map(member => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="group-todo-summary">
        <div className="summary-item total">
          <span className="summary-count">{filteredTodos.length}</span>
          <span className="summary-label">总数</span>
        </div>
        <div className="summary-item pending">
          <span className="summary-count">{filteredTodos.filter(t => t.status === 'pending').length}</span>
          <span className="summary-label">待处理</span>
        </div>
        <div className="summary-item progress">
          <span className="summary-count">{filteredTodos.filter(t => t.status === 'in-progress').length}</span>
          <span className="summary-label">进行中</span>
        </div>
        <div className="summary-item done">
          <span className="summary-count">{filteredTodos.filter(t => t.status === 'completed').length}</span>
          <span className="summary-label">已完成</span>
        </div>
      </div>

      {/* 新增图表：成员工作负载和优先级分布 */}
      <div className="chart-row">
        <div className="chart-section" style={{ flex: 1 }}>
          <div className="section-title">
            <span className="title-bar" style={{ backgroundColor: '#3a86ff' }}></span>
            <h3>成员工作负载</h3>
          </div>
          <ReactECharts option={memberWorkloadChartOption} style={{ height: 300 }} />
        </div>

        <div className="chart-section" style={{ flex: 1 }}>
          <div className="section-title">
            <span className="title-bar" style={{ backgroundColor: '#f59e0b' }}></span>
            <h3>优先级分布</h3>
          </div>
          <ReactECharts option={priorityDistributionChartOption} style={{ height: 300 }} />
        </div>
      </div>

      <table className="group-todo-table">
        <thead>
          <tr>
            <th>工单标题</th>
            <th>负责人</th>
            <th>优先级</th>
            <th>截止日期</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map(todo => (
            <tr key={todo.id}>
              <td className="title-cell">{todo.title}</td>
              <td>{todo.assigneeName}</td>
              <td><span className={`priority-badge ${getPriorityClass(todo.priority)}`}>{todo.priority.toUpperCase()}</span></td>
              <td>{todo.dueDate}</td>
              <td><span className={`status-badge ${getStatusClass(todo.status)}`}>{getStatusText(todo.status)}</span></td>
              <td>
                <button className="action-btn view-btn">查看</button>
                <button className="action-btn edit-btn">编辑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GroupTodo
