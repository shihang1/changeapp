import React, { useState } from 'react';

function ArchivedTickets() {
  const [tickets, setTickets] = useState([
    {
      id: 'IM-HQ-20260401-0001',
      title: '服务器磁盘空间告警处理',
      type: '故障',
      level: '紧急',
      status: '已归档',
      priority: '高',
      creator: '张三',
      assignee: '李四',
      createdTime: '2026-04-01 10:30',
      archivedTime: '2026-04-05 15:20',
      archivedBy: '系统管理员'
    },
    {
      id: 'IM-HQ-20260328-0003',
      title: '网络设备配置变更完成',
      type: '变更',
      level: '标准',
      status: '已归档',
      priority: '中',
      creator: '王五',
      assignee: '赵六',
      createdTime: '2026-03-28 09:15',
      archivedTime: '2026-04-02 14:10',
      archivedBy: '王五'
    },
    {
      id: 'IM-HQ-20260325-0005',
      title: '应用系统版本发布完成',
      type: '发布',
      level: '重要',
      status: '已归档',
      priority: '高',
      creator: '钱七',
      assignee: '孙八',
      createdTime: '2026-03-25 16:45',
      archivedTime: '2026-03-30 11:30',
      archivedBy: '系统管理员'
    },
    {
      id: 'IM-HQ-20260320-0002',
      title: '数据库备份任务完成',
      type: '任务',
      level: '标准',
      status: '已归档',
      priority: '中',
      creator: '周九',
      assignee: '吴十',
      createdTime: '2026-03-20 11:20',
      archivedTime: '2026-03-22 09:45',
      archivedBy: '周九'
    },
    {
      id: 'IM-HQ-20260315-0007',
      title: '安全漏洞修复完成',
      type: '安全',
      level: '紧急',
      status: '已归档',
      priority: '高',
      creator: '郑十一',
      assignee: '王十二',
      createdTime: '2026-03-15 13:45',
      archivedTime: '2026-03-20 16:30',
      archivedBy: '系统管理员'
    },
    {
      id: 'IM-HQ-20260310-0004',
      title: '监控系统告警规则调整完成',
      type: '优化',
      level: '标准',
      status: '已归档',
      priority: '低',
      creator: '李十三',
      assignee: '张十四',
      createdTime: '2026-03-10 10:00',
      archivedTime: '2026-03-15 14:20',
      archivedBy: '李十三'
    },
    {
      id: 'IM-HQ-20260305-0006',
      title: '基础设施维护完成',
      type: '维护',
      level: '重要',
      status: '已归档',
      priority: '中',
      creator: '刘十五',
      assignee: '陈十六',
      createdTime: '2026-03-05 14:20',
      archivedTime: '2026-03-12 10:15',
      archivedBy: '系统管理员'
    },
    {
      id: 'IM-HQ-20260228-0008',
      title: '业务系统数据迁移完成',
      type: '数据',
      level: '重要',
      status: '已归档',
      priority: '高',
      creator: '黄十七',
      assignee: '林十八',
      createdTime: '2026-02-28 15:30',
      archivedTime: '2026-03-10 17:45',
      archivedBy: '系统管理员'
    }
  ]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedType, setSelectedType] = useState('全部');
  const [selectedLevel, setSelectedLevel] = useState('全部');
  const [selectedArchivedBy, setSelectedArchivedBy] = useState('全部');

  const typeOptions = ['全部', '故障', '变更', '发布', '任务', '安全', '优化', '维护', '数据'];
  const levelOptions = ['全部', '紧急', '重要', '标准'];
  const archivedByOptions = ['全部', '系统管理员', '张三', '王五', '钱七', '周九', '郑十一', '李十三', '刘十五', '黄十七'];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = !searchKeyword || 
      ticket.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      ticket.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      ticket.creator.toLowerCase().includes(searchKeyword.toLowerCase());
    
    const matchesType = selectedType === '全部' || ticket.type === selectedType;
    const matchesLevel = selectedLevel === '全部' || ticket.level === selectedLevel;
    const matchesArchivedBy = selectedArchivedBy === '全部' || ticket.archivedBy === selectedArchivedBy;

    return matchesSearch && matchesType && matchesLevel && matchesArchivedBy;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case '已归档': return 'status-archived';
      default: return 'status-archived';
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

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleArchivedByChange = (e) => {
    setSelectedArchivedBy(e.target.value);
  };

  const handleViewTicket = (ticketId) => {
    alert(`查看归档工单详情: ${ticketId}`);
  };

  const handleRestoreTicket = (ticketId) => {
    const confirmRestore = window.confirm(`确定要恢复工单 ${ticketId} 吗？`);
    if (confirmRestore) {
      setTickets(tickets.filter(ticket => ticket.id !== ticketId));
      alert(`工单 ${ticketId} 已恢复`);
    }
  };

  const handleExportTicket = (ticketId) => {
    alert(`导出工单: ${ticketId}`);
  };

  const handleDeletePermanently = (ticketId) => {
    const confirmDelete = window.confirm(`确定要永久删除归档工单 ${ticketId} 吗？此操作不可恢复！`);
    if (confirmDelete) {
      setTickets(tickets.filter(ticket => ticket.id !== ticketId));
      alert(`工单 ${ticketId} 已永久删除`);
    }
  };

  return (
    <div className="all-tickets-container">
      <div className="tickets-header">
        <h2>归档工单</h2>
        <div className="header-summary">
          <span className="summary-item">
            <span className="summary-count">{tickets.length}</span>
            <span className="summary-label">总归档数</span>
          </span>
          <span className="summary-item">
            <span className="summary-count">{tickets.filter(t => t.level === '紧急').length}</span>
            <span className="summary-label">紧急工单</span>
          </span>
          <span className="summary-item">
            <span className="summary-count">{tickets.filter(t => t.type === '故障').length}</span>
            <span className="summary-label">故障工单</span>
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
            <i className="fas fa-download"></i> 批量导出
          </button>
        </div>

        <div className="filter-section">
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

          <div className="filter-group">
            <label htmlFor="archivedByFilter">归档人:</label>
            <select 
              id="archivedByFilter" 
              value={selectedArchivedBy}
              onChange={handleArchivedByChange}
            >
              {archivedByOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <button className="btn-clear-filters" onClick={() => {
            setSelectedType('全部');
            setSelectedLevel('全部');
            setSelectedArchivedBy('全部');
            setSearchKeyword('');
          }}>
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
              <th>级别</th>
              <th>状态</th>
              <th>优先级</th>
              <th>创建人</th>
              <th>负责人</th>
              <th>创建时间</th>
              <th>归档时间</th>
              <th>归档人</th>
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
                  <span className={`level-badge ${getLevelBadgeClass(ticket.level)}`}>
                    {ticket.level}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>
                  <span className={`priority-badge ${getPriorityBadgeClass(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td>{ticket.creator}</td>
                <td>{ticket.assignee}</td>
                <td>{ticket.createdTime}</td>
                <td>{ticket.archivedTime}</td>
                <td>{ticket.archivedBy}</td>
                <td className="action-buttons">
                  <button 
                    className="btn-view" 
                    onClick={() => handleViewTicket(ticket.id)}
                    title="查看详情"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button 
                    className="btn-restore" 
                    onClick={() => handleRestoreTicket(ticket.id)}
                    title="恢复工单"
                  >
                    <i className="fas fa-undo"></i>
                  </button>
                  <button 
                    className="btn-export-single" 
                    onClick={() => handleExportTicket(ticket.id)}
                    title="导出"
                  >
                    <i className="fas fa-download"></i>
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDeletePermanently(ticket.id)}
                    title="永久删除"
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
          <i className="fas fa-archive"></i>
          <p>没有找到符合条件的归档工单</p>
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

export default ArchivedTickets;