import React from 'react'

function WelcomePage({ onNewClick }) {
  return (
    <div className="welcome-page">
      <div className="welcome-icon">
        <i className="fas fa-ticket-alt"></i>
      </div>
      <h1 className="welcome-title">欢迎使用工单管理系统</h1>
      <p className="welcome-description">
        高效管理您的工单流程，从创建、分配到完成，全程跟踪每个工单的状态。
        点击"新建"按钮开始创建第一个工单，或从左侧导航栏中选择其他功能。
      </p>
      <div className="welcome-actions">
        <button className="sidebar-new-btn" onClick={onNewClick}>
          <i className="fas fa-plus"></i>新建工单
        </button>
      </div>
    </div>
  )
}

export default WelcomePage
