import React, { useState } from 'react'

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
