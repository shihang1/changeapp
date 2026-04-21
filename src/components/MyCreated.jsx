import React, { useState } from 'react'

function MyCreated() {
  const [viewMode, setViewMode] = useState('list') // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('')
  
  const myCreatedTickets = [
    {
      id: 'TK-001240',
      title: '资产入库流程 - 新增服务器',
      createDate: '2026-04-19',
      status: 'draft',
      category: '资源申请',
      priority: 'medium',
      comments: 2,
      attachments: 1
    },
    {
      id: 'TK-001235',
      title: '设备上架方案 - 核心交换机',
      createDate: '2026-04-17',
      status: 'pending-review',
      category: '变更管理',
      priority: 'high',
      comments: 5,
      attachments: 3
    },
    {
      id: 'TK-001232',
      title: 'IAAS实例申请 - 测试环境扩容',
      createDate: '2026-04-15',
      status: 'approved',
      category: '资源申请',
      priority: 'low',
      comments: 8,
      attachments: 2
    },
    {
      id: 'TK-001228',
      title: '自动化管理流程 - CI/CD优化',
      createDate: '2026-04-14',
      status: 'in-execution',
      category: '服务请求',
      priority: 'medium',
      comments: 3,
      attachments: 0
    },
    {
      id: 'TK-001222',
      title: '容器实例申请 - 生产环境',
      createDate: '2026-04-11',
      status: 'completed',
      category: '资源申请',
      priority: 'high',
      comments: 12,
      attachments: 5
    },
    {
      id: 'TK-001218',
      title: '部署方案生成 - 灾备演练',
      createDate: '2026-04-09',
      status: 'rejected',
      category: '变更管理',
      priority: 'urgent',
      comments: 7,
      attachments: 4
    },
    {
      id: 'TK-001210',
      title: '资源释放 - 旧服务器下线',
      createDate: '2026-04-06',
      status: 'completed',
      category: '资源申请',
      priority: 'medium',
      comments: 4,
      attachments: 1
    },
    {
      id: 'TK-001205',
      title: '标准变更模板修订',
      createDate: '2026-04-02',
      status: 'archived',
      category: '变更管理',
      priority: 'low',
      comments: 15,
      attachments: 6
    }
  ]

  const getStatusConfig = (status) => {
    const configs = {
      draft: { text: '草稿', class: 'status-draft', icon: 'fa-file' },
      'pending-review': { text: '待审核', class: 'status-pending-review', icon: 'fa-hourglass-half' },
      approved: { text: '已通过', class: 'status-approved', icon: 'fa-check-circle' },
      'in-execution': { text: '执行中', class: 'status-execution', icon: 'fa-play-circle' },
      completed: { text: '已完成', class: 'status-completed', icon: 'fa-flag-checkered' },
      rejected: { text: '已驳回', class: 'status-rejected', icon: 'fa-times-circle' },
      archived: { text: '已归档', class: 'status-archived', icon: 'fa-archive' }
    }
    return configs[status] || configs.draft
  }

  const getPriorityClass = (priority) => {
    const classes = {
      urgent: 'priority-urgent',
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low'
    }
    return classes[priority] || classes.medium
  }

  const filteredTickets = searchTerm 
    ? myCreatedTickets.filter(ticket => 
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : myCreatedTickets

  return (
    <div className="my-created-container">
      <div className="my-created-header">
        <h2>我创建的</h2>
        <div className="header-controls">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="搜索工单..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <i className="fas fa-list"></i>
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <i className="fas fa-th-large"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="created-summary">
        <div className="summary-chip">
          <span className="chip-count">{myCreatedTickets.length}</span>
          <span>总计</span>
        </div>
        <div className="summary-chip draft">
          <span className="chip-count">{myCreatedTickets.filter(t => t.status === 'draft').length}</span>
          <span>草稿</span>
        </div>
        <div className="summary-chip pending">
          <span className="chip-count">{myCreatedTickets.filter(t => t.status === 'pending-review').length}</span>
          <span>待审核</span>
        </div>
        <div className="summary-chip in-progress">
          <span className="chip-count">{myCreatedTickets.filter(t => t.status === 'in-execution').length}</span>
          <span>执行中</span>
        </div>
        <div className="summary-chip done">
          <span className="chip-count">{myCreatedTickets.filter(t => t.status === 'completed').length}</span>
          <span>已完成</span>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="tickets-table-wrapper">
          <table className="tickets-table">
            <thead>
              <tr>
                <th>工单编号</th>
                <th>标题</th>
                <th>分类</th>
                <th>优先级</th>
                <th>状态</th>
                <th>创建日期</th>
                <th>评论</th>
                <th>附件</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map(ticket => {
                const statusConfig = getStatusConfig(ticket.status)
                
                return (
                  <tr key={ticket.id}>
                    <td className="ticket-id-cell">{ticket.id}</td>
                    <td className="ticket-title-cell">{ticket.title}</td>
                    <td>{ticket.category}</td>
                    <td>
                      <span className={`priority-tag ${getPriorityClass(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span className={`status-tag ${statusConfig.class}`}>
                        <i className={`fas ${statusConfig.icon}`}></i> {statusConfig.text}
                      </span>
                    </td>
                    <td>{ticket.createDate}</td>
                    <td>
                      <span className="meta-count">
                        <i className="far fa-comment"></i> {ticket.comments}
                      </span>
                    </td>
                    <td>
                      <span className="meta-count">
                        <i className="fas fa-paperclip"></i> {ticket.attachments}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button className="row-action-btn">查看</button>
                        <button className="row-action-btn">编辑</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="created-tickets-grid">
          {filteredTickets.map(ticket => {
            const statusConfig = getStatusConfig(ticket.status)
            
            return (
              <div key={ticket.id} className="created-ticket-card">
                <div className="card-top-row">
                  <span className="card-ticket-id">{ticket.id}</span>
                  <span className={`card-priority ${getPriorityClass(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </div>
                <h3 className="card-ticket-title">{ticket.title}</h3>
                <p className="card-category">{ticket.category}</p>
                <div className="card-bottom-row">
                  <span className={`card-status ${statusConfig.class}`}>
                    {statusConfig.text}
                  </span>
                  <div className="card-meta">
                    <span><i className="far fa-comment"></i> {ticket.comments}</span>
                    <span><i className="fas fa-paperclip"></i> {ticket.attachments}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyCreated
