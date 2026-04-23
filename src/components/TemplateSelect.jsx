import React, { useState } from 'react'

function TemplateSelect({ onSelectTemplate, onBack }) {
  const allTemplates = [
    {
      id: 'head_office_change',
      name: '总行基础设施变更流程',
      icon: 'fa-building',
      description: '用于实施设备维护、环境部署、网络调整、应用系统运维、数据提取等基础设施变更，实现对该类变更的制定、审核、预审、评审、审批、实施、反馈、关闭等操作',
      color: '#3a86ff',
      isRecent: false
    },
    {
      id: 'branch_change',
      name: '分行及子公司基础设施变更流程',
      icon: 'fa-code-branch',
      description: '用于实施设备维护、网络调整、分行系统运维、数据提取等基础设施变更，实现对该类变更的制定、审批、报备、实施、反馈、关闭等操作',
      color: '#10b981',
      isRecent: false
    },
    {
      id: 'routine_change',
      name: '场景化变更模板管理流程',
      icon: 'fa-calendar-check',
      description: '用于处理日常例行变更，包括定期维护、系统更新、数据备份等标准化操作用于对变更场景化模板进行日常管理的流程，包括模板修订（录入、修改、删除）、模板审核、模板审批、模板评审等全生命周期环节',
      color: '#f59e0b',
      isRecent: false
    },
    {
      id: 'asset_inbound',
      name: '标准变更模板管理流程',
      icon: 'fa-boxes-stacked',
      description: '用于对标准变更进行日常管理的流程，包括标准变更的修订（录入、修改、删除）、审核、审批、评审、预授权等全生命周期环节',
      color: '#8b5cf6',
      isRecent: false
    }
  ]

  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredTemplates = allTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="template-select-container">
      <div className="template-header">
        <button className="back-btn" onClick={onBack}>
          <i className="fas fa-arrow-left"></i>
          返回
        </button>
        <div className="header-content">
          {/* 标题已移除 */}
        </div>
      </div>

      <div className="template-content">
        <div className="search-header">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="搜索模板名称或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredTemplates.length === 0 ? (
          <div className="no-templates-message">
            <i className="fas fa-search"></i>
            <h3>未找到匹配的模板</h3>
            <p>请尝试其他搜索关键词</p>
          </div>
        ) : (
          <div className="templates-grid">
            {filteredTemplates.map(template => (
              <div 
                key={template.id} 
                className="template-card"
              >
                {template.isRecent && (
                  <div className="recent-badge">
                    <i className="fas fa-history"></i>
                    最近使用
                  </div>
                )}
                <div className="card-header" style={{ backgroundColor: template.color }}>
                  <div className="card-icon">
                    <i className={`fas ${template.icon}`}></i>
                  </div>
                </div>
                <div className="card-body">
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                  {template.lastUsed && (
                    <div className="last-used">
                      <i className="far fa-clock"></i>
                      {template.lastUsed}
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <button 
                    className="select-btn"
                    onClick={() => onSelectTemplate && onSelectTemplate(template.id)}
                  >
                    {template.id === 'routine_change' || template.id === 'asset_inbound' ? '创建' : '选择模板'}
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}


      </div>
    </div>
  )
}

export default TemplateSelect