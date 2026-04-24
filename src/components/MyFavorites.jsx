import React from 'react'

function MyFavorites({ onNewClick }) {
  // 重新设计首页布局
  const mainTitle = "欢迎来到变更管理系统";
  const subTitle = "快速访问您最常用的功能和流程";
  
  const handleOpenFavorite = (cardId) => {
    alert(`打开收藏卡片 ID: ${cardId}`);
    // 实际应用中这里会有打开变更详情的逻辑
  };
  
  const quickActions = [
    {
      id: 1,
      title: '创建新变更',
      icon: 'fa-plus-circle',
      color: '#3a86ff',
      description: '开始新的变更流程',
      onClick: () => onNewClick && onNewClick()
    },
    {
      id: 2,
      title: '我的待办',
      icon: 'fa-tasks',
      color: '#10b981',
      description: '查看待处理任务',
      onClick: () => alert('导航到我的待办页面')
    },
    {
      id: 3,
      title: '流程模板',
      icon: 'fa-th-large',
      color: '#f59e0b',
      description: '选择变更模板',
      onClick: () => alert('导航到流程模板页面')
    },
    {
      id: 4,
      title: '统计报表',
      icon: 'fa-chart-bar',
      color: '#8b5cf6',
      description: '查看变更统计',
      onClick: () => alert('导航到统计报表页面')
    }
  ];

  // 辅助函数：将优先级映射为 CSS 类名
  const getPriorityClass = (priority) => {
    switch (priority) {
      case '紧急': return 'urgent';
      case '高': return 'high';
      case '中': return 'medium';
      case '低': return 'low';
      default: return 'medium';
    }
  };

  // 辅助函数：将状态映射为 CSS 类名
  const getStatusClass = (status) => {
    if (status.includes('进行中') || status.includes('处理中') || status.includes('修复中') || status.includes('调查中')) return 'in-progress';
    if (status.includes('待审批') || status.includes('预审中')) return 'pending';
    if (status.includes('已完成') || status.includes('已完成')) return 'completed';
    if (status.includes('测试中')) return 'reviewing';
    if (status.includes('实施阶段')) return 'execution';
    return 'pending';
  };

  const favoriteCards = [
    {
      id: 1,
      ticketNumber: 'CHG-20260424-001',
      title: '总行服务器硬件升级',
      modelName: '标准变更流程',
      priority: '高',
      currentStage: '实施阶段',
      currentHandler: '张三',
      createdTime: '2026-04-24 09:30',
      status: '进行中',
      category: 'change',
      favoriteDate: '2026-04-24'
    },
    {
      id: 2,
      ticketNumber: 'INC-20260424-002',
      title: '数据库连接故障',
      modelName: '故障处理流程',
      priority: '紧急',
      currentStage: '处理中',
      currentHandler: '李四',
      createdTime: '2026-04-24 10:15',
      status: '处理中',
      category: 'incident',
      favoriteDate: '2026-04-24'
    },
    {
      id: 3,
      ticketNumber: 'REQ-20260424-003',
      title: '新增虚拟机申请',
      modelName: '资源申请流程',
      priority: '中',
      currentStage: '审批阶段',
      currentHandler: '王五',
      createdTime: '2026-04-24 11:20',
      status: '待审批',
      category: 'resource',
      favoriteDate: '2026-04-24'
    },
    {
      id: 4,
      ticketNumber: 'CHG-20260423-004',
      title: '网络设备配置变更',
      modelName: '网络变更流程',
      priority: '高',
      currentStage: '预审阶段',
      currentHandler: '赵六',
      createdTime: '2026-04-23 14:45',
      status: '预审中',
      category: 'change',
      favoriteDate: '2026-04-23'
    },
    {
      id: 5,
      ticketNumber: 'TASK-20260423-005',
      title: '系统备份任务',
      modelName: '系统任务流程',
      priority: '低',
      currentStage: '已完成',
      currentHandler: '钱七',
      createdTime: '2026-04-23 16:30',
      status: '已完成',
      category: 'task',
      favoriteDate: '2026-04-23'
    },
    {
      id: 6,
      ticketNumber: 'PROB-20260422-006',
      title: '应用性能问题分析',
      modelName: '问题分析流程',
      priority: '中',
      currentStage: '调查阶段',
      currentHandler: '孙八',
      createdTime: '2026-04-22 09:10',
      status: '调查中',
      category: 'problem',
      favoriteDate: '2026-04-22'
    },
    {
      id: 7,
      ticketNumber: 'SEC-20260421-007',
      title: '安全漏洞修复',
      modelName: '安全修复流程',
      priority: '紧急',
      currentStage: '修复阶段',
      currentHandler: '周九',
      createdTime: '2026-04-21 13:25',
      status: '修复中',
      category: 'security',
      favoriteDate: '2026-04-21'
    },
    {
      id: 8,
      ticketNumber: 'REL-20260420-008',
      title: '版本发布管理',
      modelName: '版本发布流程',
      priority: '高',
      currentStage: '测试阶段',
      currentHandler: '吴十',
      createdTime: '2026-04-20 15:40',
      status: '测试中',
      category: 'release',
      favoriteDate: '2026-04-20'
    }
  ]

  return (
    <div className="centered-homepage">
      {/* 中心内容区域 */}
      <div className="homepage-center">
        {onNewClick && (
          <>
            <div className="welcome-section">
              <h1 className="main-title">{mainTitle}</h1>
              <p className="sub-title">{subTitle}</p>
            </div>

            {/* 快速操作卡片 */}
            <div className="quick-actions-grid">
              {quickActions.map(action => (
                <div key={action.id} className="quick-action-card">
                  <div className="action-icon" style={{ backgroundColor: action.color }}>
                    <i className={`fas ${action.icon}`}></i>
                  </div>
                  <div className="action-content">
                    <h3 className="action-title">{action.title}</h3>
                    <p className="action-desc">{action.description}</p>
                  </div>
                  <button className="action-btn" onClick={action.onClick}>进入</button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 收藏区域 */}
        <div className="favorites-section">
          <div className="section-header">
            <h2>我的收藏</h2>
            <span className="favorites-count">{favoriteCards.length} 个收藏项</span>
          </div>

          <div className="favorites-form-list">
            {(onNewClick ? favoriteCards.slice(0, 4) : favoriteCards).map(card => (
              <div key={card.id} className="favorite-form-item">
                <div className="form-item-header">
                  <div className="form-item-title">
                    <span className="ticket-id">{card.ticketNumber}</span>
                    <h3 className="ticket-title">{card.title}</h3>
                  </div>
                  <div className="form-item-actions">
                    <button className="action-btn view-btn" onClick={() => handleOpenFavorite(card.id)}>打开</button>
                  </div>
                </div>
                
                <div className="form-item-fields">
                  <div className="form-field">
                    <label>模型名称</label>
                    <span className="field-value">{card.modelName}</span>
                  </div>
                  <div className="form-field">
                    <label>工单优先级</label>
                    <span className={`priority-badge priority-${getPriorityClass(card.priority)}`}>
                      {card.priority}
                    </span>
                  </div>
                  <div className="form-field">
                    <label>当前环节</label>
                    <span className="field-value">{card.currentStage}</span>
                  </div>
                  <div className="form-field">
                    <label>当前处理人</label>
                    <span className="field-value">{card.currentHandler}</span>
                  </div>
                  <div className="form-field">
                    <label>创建时间</label>
                    <span className="field-value">{card.createdTime}</span>
                  </div>
                  <div className="form-field">
                    <label>工单状态</label>
                    <span className={`status-badge status-${getStatusClass(card.status)}`}>
                      {card.status}
                    </span>
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

export default MyFavorites
