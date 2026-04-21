import React from 'react'

function Sidebar({ activeNav, onNavClick, onNewClick }) {
  return (
    <div className="sidebar">
      <div className="logo-area" onClick={() => onNavClick('home')}>
        <i className="fas fa-tools"></i> 变更管理系统
      </div>
      
      <button className="sidebar-new-btn" onClick={onNewClick}>
        <i className="fas fa-plus"></i>新建
      </button>
      
      <div className="nav-menu">
        <div className="nav-section">
          <div className="nav-section-title">变更管理</div>
          <div 
            className={`nav-item ${activeNav === 'changeView' ? 'active' : ''}`}
            onClick={() => onNavClick('changeView')}
          >
            <i className="fas fa-search"></i> 变更视图
          </div>
          <div 
            className={`nav-item ${activeNav === 'workCalendar' ? 'active' : ''}`}
            onClick={() => onNavClick('workCalendar')}
          >
            <i className="fas fa-cogs"></i> 工作日历
          </div>
          <div 
            className={`nav-item ${activeNav === 'changeReport' ? 'active' : ''}`}
            onClick={() => onNavClick('changeReport')}
          >
            <i className="fas fa-shield-alt"></i> 变更报告
          </div>
        </div>
        
        <div className="nav-section">
          <div className="nav-section-title">我的工单</div>
          <div 
            className={`nav-item ${activeNav === 'overview' ? 'active' : ''}`}
            onClick={() => onNavClick('overview')}
          >
            <i className="fas fa-chart-pie"></i> 总览
          </div>
          <div 
            className={`nav-item ${activeNav === 'myTodo' ? 'active' : ''}`}
            onClick={() => onNavClick('myTodo')}
          >
            <i className="fas fa-tasks"></i> 个人待办
            <span className="badge">99+</span>
          </div>
          <div 
            className={`nav-item ${activeNav === 'groupTodo' ? 'active' : ''}`}
            onClick={() => onNavClick('groupTodo')}
          >
            <i className="fas fa-users"></i> 组内待办
            <span className="badge">2</span>
          </div>
          <div 
            className={`nav-item ${activeNav === 'myFavorites' ? 'active' : ''}`}
            onClick={() => onNavClick('myFavorites')}
          >
            <i className="fas fa-star"></i> 我的收藏
            <span className="badge">2</span>
          </div>
          <div 
            className={`nav-item ${activeNav === 'myParticipation' ? 'active' : ''}`}
            onClick={() => onNavClick('myParticipation')}
          >
            <i className="fas fa-user-check"></i> 我参与的
            <span className="badge">1</span>
          </div>
          <div 
            className={`nav-item ${activeNav === 'myCreated' ? 'active' : ''}`}
            onClick={() => onNavClick('myCreated')}
          >
            <i className="fas fa-user-edit"></i> 我创建的
          </div>
        </div>
        
        <div className="nav-section">
          <div className="nav-section-title">工单管理</div>
          <div 
            className={`nav-item ${activeNav === 'archived' ? 'active' : ''}`}
            onClick={() => onNavClick('archived')}
          >
            <i className="fas fa-archive"></i> 归档工单
          </div>
          <div 
            className={`nav-item ${activeNav === 'allTickets' ? 'active' : ''}`}
            onClick={() => onNavClick('allTickets')}
          >
            <i className="fas fa-list"></i> 所有工单
          </div>
          <div 
            className={`nav-item ${activeNav === 'drafts' ? 'active' : ''}`}
            onClick={() => onNavClick('drafts')}
          >
            <i className="fas fa-file-alt"></i> 草稿箱
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
