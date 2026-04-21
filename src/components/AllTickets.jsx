import React, { useState } from 'react';

function AllTickets() {
  const [tickets, setTickets] = useState([
    {
      id: 'IM-HQ-20260415-0002',
      title: '服务器磁盘空间告警',
      type: '故障',
      level: '紧急',
      status: '处理中',
      priority: '高',
      creator: '张三',
      assignee: '李四',
      createdTime: '2026-04-15 14:30',
      updatedTime: '2026-04-15 16:45',
      deadline: '2026-04-16 18:00'
    },
    {
      id: 'IM-HQ-20260414-0001',
      title: '网络设备配置变更',
      type: '变更',
      level: '标准',
      status: '待审批',
      priority: '中',
      creator: '王五',
      assignee: '赵六',
      createdTime: '2026-04-14 09:15',
      updatedTime: '2026-04-15 10:20',
      deadline: '2026-04-18 17:00'
    },
    {
      id: 'IM-HQ-20260413-0005',
      title: '应用系统版本发布',
      type: '发布',
      level: '重要',
      status: '执行中',
      priority: '高',
      creator: '钱七',
      assignee: '孙八',
      createdTime: '2026-04-13 16:45',
      updatedTime: '2026-04-15 09:30',
      deadline: '2026-04-16 22:00'
    },
    {
      id: 'IM-HQ-20260412-0003',
      title: '数据库备份任务',
      type: '任务',
      level: '标准',
      status: '已完成',
      priority: '中',
      creator: '周九',
      assignee: '吴十',
      createdTime: '2026-04-12 11:20',
      updatedTime: '2026-04-14 15:10',
      deadline: '2026-04-13 23:59'
    },
    {
      id: 'IM-HQ-20260411-0007',
      title: '安全漏洞修复',
      type: '安全',
      level: '紧急',
      status: '处理中',
      priority: '高',
      creator: '郑十一',
      assignee: '王十二',
      createdTime: '2026-04-11 13:45',
      updatedTime: '2026-04-15 14:15',
      deadline: '2026-04-17 12:00'
    },
    {
      id: 'IM-HQ-20260410-0004',
      title: '监控系统告警规则调整',
      type: '优化',
      level: '标准',
      status: '已关闭',
      priority: '低',
      creator: '李十三',
      assignee: '张十四',
      createdTime: '2026-04-10 10:00',
      updatedTime: '2026-04-12 16:30',
      deadline: '2026-04-15 18:00'
    },
    {
      id: 'IM-HQ-20260409-0006',
      title: '基础设施维护',
      type: '维护',
      level: '重要',
      status: '待分配',
      priority: '中',
      creator: '刘十五',
      assignee: '-',
      createdTime: '2026-04-09 14:20',
      updatedTime: '2026-04-10 09:45',
      deadline: '2026-04-20 17:00'
    },
    {
      id: 'IM-HQ-20260408-0008',
      title: '业务系统数据迁移',
      type: '数据',
      level: '重要',
      status: '计划中',
      priority: '高',
      creator: '陈十六',
      assignee: '黄十七',
      createdTime: '2026-04-08 15:30',
      updatedTime: '2026-04-14 11:20',
      deadline: '2026-04-25 23:59'
    }
  ]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('全部');
  const [selectedType, setSelectedType] = useState('全部');
  const [selectedLevel, setSelectedLevel] = useState('全部');

  const statusOptions = ['全部', '待分配', '处理中', '待审批', '执行中', '已完成', '已关闭', '计划中'];
  const typeOptions = ['全部', '故障', '变更', '发布', '任务', '安全', '优化', '维护', '数据'];
  const levelOptions = ['全部', '紧急', '重要', '标准'];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = !searchKeyword || 
      ticket.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      ticket.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      ticket.creator.toLowerCase().includes(searchKeyword.toLowerCase());
    
    const matchesStatus = selectedStatus === '全部' || ticket.status === selectedStatus;
    const matchesType = selectedType === '全部' || ticket.type === selectedType;
    const matchesLevel = selectedLevel === '全部' || ticket.level === selectedLevel;

    return matchesSearch && matchesStatus && matchesType && matchesLevel;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case '待分配': return 'status-pending';
      case '处理中': return 'status-in-progress';
      case '待审批': return 'status-reviewing';
      case '执行中': return 'status-execution';
      case '已完成': return 'status-completed';
      case '已关闭': return 'status-resolved';
      case '计划中': return 'status-archived';
      default: return 'status-pending';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case '高': return 'priority-urgent';
      case '中': return 'priority-high';
      case '低': return 'priority-medium';
      default: return 'priority-low';
    }
  };

  const getLevelBadgeClass = (level) => {
    switch (level) {
      case '紧急': return 'level-emergency';
      case '重要': return 'level-important';
      case '标准': return 'level-standard';
      default: return 'level-standard';
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleViewTicket = (ticketId) => {
    alert(`查看工单详情: ${ticketId}`);
  };

  const handleAssignTicket = (ticketId) => {
    alert(`分配工单: ${ticketId}`);
  };

  const handleEditTicket = (ticketId) => {
    alert(`编辑工单: ${ticketId}`);
  };

  const handleDeleteTicket = (ticketId) => {
    const confirmDelete = window.confirm(`确定要删除工单 ${ticketId} 吗？`);
    if (confirmDelete) {
      setTickets(tickets.filter(ticket => ticket.id !== ticketId));
      alert(`工单 ${ticketId} 已删除`);
    }
  };

  return (
    <div className="all-tickets-container">
      <div className="tickets-header">
        <h2>所有工单</h2>
        <div className="header-summary">
          <span className="summary-item">
            <span className="summary-count">{tickets.length}</span>
            <span className="summary-label">总工单数</span>
          </span>
          <span className="summary-item">
            <span className="summary-count">{tickets.filter(t => t.status === '处理中').length}</span>
            <span className="summary-label">处理中</span>
          </span>
          <span className="summary-item">
            <span className="summary-count">{tickets.filter(t => t.status === '待审批').length}</span>
            <span className="summary-label">待审批</span>
          </span>
        </div>
      </div>

      <div className="tickets-toolbar">
        <div className="search-section">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="搜索工单ID、标题、创建人..." 
              value={searchKeyword}
              onChange={handleSearchChange}
            />
          </div>
          <button className="btn-refresh">
            <i className="fas fa-sync-alt"></i> 刷新
          </button>
          <button className="btn-export">
            <i className="fas fa-download"></i> 导出
          </button>
        </div>

        <div className="filter-section">
          <div className="filter-group">
            <label htmlFor="statusFilter">状态:</label>
            <select 
              id="statusFilter" 
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="typeFilter">类型:</label>
            <select 
              id="typeFilter" 
              value={selectedType}
              onChange={handleTypeChange}
            >
              {typeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="levelFilter">级别:</label>
            <select 
              id="levelFilter" 
              value={selectedLevel}
              onChange={handleLevelChange}
            >
              {levelOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <button className="btn-clear-filters">
            <i className="fas fa-times"></i> 清除筛选
          </button>
        </div>
      </div>

      <div className="tickets-table-wrapper">
        <table className="tickets-table">
          <thead>
            <tr>
              <th>工单ID</th>
              <th>标题</th>
              <th>类型</th>
              <th>状态</th>
              <th>负责人</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket.id}>
                <td className="ticket-id-cell">{ticket.id}</td>
                <td className="ticket-title-cell">{ticket.title}</td>
                <td>
                  <span className="type-badge">
                    {ticket.type}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>{ticket.assignee}</td>
                <td>{ticket.createdTime}</td>
                <td className="action-buttons">
                  <button
                    className="btn-view"
                    onClick={() => handleViewTicket(ticket.id)}
                    title="查看详情"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() => handleEditTicket(ticket.id)}
                    title="编辑"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn-assign"
                    onClick={() => handleAssignTicket(ticket.id)}
                    title="分配"
                  >
                    <i className="fas fa-user-plus"></i>
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteTicket(ticket.id)}
                    title="删除"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTickets.length === 0 && (
        <div className="no-tickets-message">
          <i className="fas fa-inbox"></i>
          <p>没有找到符合条件的工单</p>
          {searchKeyword && <p>搜索关键词: "{searchKeyword}"</p>}
        </div>
      )}

      <div className="tickets-pagination">
        <div className="pagination-info">
          显示 1-{filteredTickets.length} 条，共 {filteredTickets.length} 条
        </div>
        <div className="pagination-controls">
          <button className="btn-prev" disabled>
            <i className="fas fa-chevron-left"></i> 上一页
          </button>
          <span className="page-numbers">
            <span className="page-active">1</span>
            <span className="page">2</span>
            <span className="page">3</span>
            <span className="page-dots">...</span>
          </span>
          <button className="btn-next">
            下一页 <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllTickets;