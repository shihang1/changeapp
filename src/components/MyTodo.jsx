import React, { useState } from 'react'

function MyTodo() {
  const [filterStatus, setFilterStatus] = useState('all')

  const todoItems = [
    { id: 1, title: '资产入库流程审批', priority: 'high', status: 'pending', deadline: '2026-04-21', creator: '李四' },
    { id: 2, title: '设备上架方案审核', priority: 'medium', status: 'in-progress', deadline: '2026-04-22', creator: '王五' },
    { id: 3, title: '技术整体方案评审', priority: 'high', status: 'pending', deadline: '2026-04-23', creator: '张三' },
    { id: 4, title: '故障处理工单确认', priority: 'urgent', status: 'in-progress', deadline: '2026-04-21', creator: '系统自动' },
    { id: 5, title: '自动化管理流程更新', priority: 'low', status: 'completed', deadline: '2026-04-20', creator: '赵六' },
    { id: 6, title: '部署方案生成(演练)', priority: 'medium', status: 'pending', deadline: '2026-04-25', creator: '李四' },
    { id: 7, title: '容器实例申请审批', priority: 'high', status: 'in-progress', deadline: '2026-04-22', creator: '王五' },
    { id: 8, title: '资源释放确认', priority: 'low', status: 'completed', deadline: '2026-04-19', creator: '系统自动' },
  ]

  const getPriorityBadge = (priority) => {
    const badges = {
      urgent: { text: '紧急', class: 'priority-urgent' },
      high: { text: '高', class: 'priority-high' },
      medium: { text: '中', class: 'priority-medium' },
      low: { text: '低', class: 'priority-low' }
    }
    return badges[priority] || badges.medium
  }

  const getStatusText = (status) => {
    const statuses = {
      pending: { text: '待处理', class: 'status-pending' },
      'in-progress': { text: '进行中', class: 'status-in-progress' },
      completed: { text: '已完成', class: 'status-completed' }
    }
    return statuses[status] || statuses.pending
  }

  const filteredItems = filterStatus === 'all' 
    ? todoItems 
    : todoItems.filter(item => item.status === filterStatus)

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>个人待办</h2>
        <div className="todo-badge">{filteredItems.length}</div>
      </div>

      <div className="todo-filters">
        <button 
          className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={() => setFilterStatus('all')}
        >
          全部
        </button>
        <button 
          className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
          onClick={() => setFilterStatus('pending')}
        >
          待处理
        </button>
        <button 
          className={`filter-btn ${filterStatus === 'in-progress' ? 'active' : ''}`}
          onClick={() => setFilterStatus('in-progress')}
        >
          进行中
        </button>
        <button 
          className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
          onClick={() => setFilterStatus('completed')}
        >
          已完成
        </button>
      </div>

      <div className="todo-list">
        {filteredItems.map(item => {
          const priorityInfo = getPriorityBadge(item.priority)
          const statusInfo = getStatusText(item.status)
          
          return (
            <div key={item.id} className="todo-item">
              <div className="todo-main">
                <div className="todo-checkbox">
                  <input 
                    type="checkbox" 
                    checked={item.status === 'completed'}
                    readOnly
                  />
                </div>
                <div className="todo-content">
                  <div className="todo-title">{item.title}</div>
                  <div className="todo-meta">
                    <span className={`badge ${priorityInfo.class}`}>{priorityInfo.text}</span>
                    <span className="deadline">
                      <i className="far fa-calendar-alt"></i> 截止: {item.deadline}
                    </span>
                    <span className="creator">
                      <i className="fas fa-user"></i> {item.creator}
                    </span>
                  </div>
                </div>
              </div>
              <div className="todo-actions">
                <span className={`status-tag ${statusInfo.class}`}>{statusInfo.text}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyTodo
