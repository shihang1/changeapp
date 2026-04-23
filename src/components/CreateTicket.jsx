import React, { useState, useEffect } from 'react'

function CreateTicket({ onCancel, onSubmit, selectedTemplate }) {
  const getTemplateInfo = (templateId) => {
    const templates = {
      resource: { name: '资源申请', icon: 'fa-cloud', color: '#3a86ff' },
      change: { name: '变更管理', icon: 'fa-cogs', color: '#10b981' },
      security: { name: '安全管理', icon: 'fa-shield-alt', color: '#ef4444' },
      task: { name: '服务请求', icon: 'fa-tasks', color: '#8b5cf6' },
      incident: { name: '事件管理', icon: 'fa-exclamation-triangle', color: '#f59e0b' },
      problem: { name: '问题管理', icon: 'fa-search', color: '#06b6d4' },
      release: { name: '发布管理', icon: 'fa-rocket', color: '#8b5cf6' },
      custom: { name: '自定义流程', icon: 'fa-pencil-alt', color: '#64748b' },
      resource_quick: { name: '快速资源申请', icon: 'fa-bolt', color: '#3a86ff' },
      change_standard: { name: '标准变更', icon: 'fa-cogs', color: '#10b981' },
      security_patch: { name: '安全补丁', icon: 'fa-shield-alt', color: '#ef4444' },
      head_office_change: { name: '总行基础设施变更流程', icon: 'fa-building', color: '#3a86ff' },
      branch_change: { name: '分行及子公司基础设施变更流程', icon: 'fa-code-branch', color: '#10b981' },
      routine_change: { name: '场景化变更模板管理流程', icon: 'fa-calendar-check', color: '#f59e0b' },
      asset_inbound: { name: '标准变更模板管理流程', icon: 'fa-boxes-stacked', color: '#8b5cf6' }
    }
    return templates[templateId] || { name: '通用工单', icon: 'fa-ticket-alt', color: '#3a86ff' }
  }

  const templateInfo = selectedTemplate ? getTemplateInfo(selectedTemplate) : null

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: selectedTemplate || 'resource',
    priority: 'medium',
    urgency: 'normal'
  })

  useEffect(() => {
    if (selectedTemplate) {
      // 根据模板类型设置默认值
      const templateDefaults = {
        resource: { priority: 'medium', urgency: 'normal' },
        change: { priority: 'high', urgency: 'fast' },
        security: { priority: 'urgent', urgency: 'immediate' },
        task: { priority: 'low', urgency: 'normal' },
        incident: { priority: 'urgent', urgency: 'immediate' },
        problem: { priority: 'high', urgency: 'fast' },
        release: { priority: 'medium', urgency: 'normal' },
        custom: { priority: 'medium', urgency: 'normal' },
        resource_quick: { priority: 'medium', urgency: 'fast' },
        change_standard: { priority: 'high', urgency: 'normal' },
        security_patch: { priority: 'urgent', urgency: 'immediate' },
        head_office_change: { priority: 'high', urgency: 'fast' },
        branch_change: { priority: 'medium', urgency: 'normal' },
        routine_change: { priority: 'medium', urgency: 'normal' },
        asset_inbound: { priority: 'medium', urgency: 'normal' }
      }
      
      const defaults = templateDefaults[selectedTemplate] || templateDefaults.resource
      setFormData(prev => ({
        ...prev,
        ...defaults
      }))
    }
  }, [selectedTemplate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
  }

  const categories = [
    { id: 'resource', name: '资源申请', icon: 'fa-cloud' },
    { id: 'change', name: '变更管理', icon: 'fa-cogs' },
    { id: 'security', name: '安全管理', icon: 'fa-shield-alt' },
    { id: 'task', name: '服务请求', icon: 'fa-tasks' }
  ]

  const priorities = [
    { id: 'low', name: '低', color: '#10b981' },
    { id: 'medium', name: '中', color: '#3b82f6' },
    { id: 'high', name: '高', color: '#f59e0b' },
    { id: 'urgent', name: '紧急', color: '#ef4444' }
  ]

  const urgencyOptions = [
    { id: 'normal', name: '普通', description: '标准处理时间' },
    { id: 'fast', name: '快速', description: '加急处理' },
    { id: 'immediate', name: '即时', description: '立即处理' }
  ]

  return (
    <div className="create-ticket-container">
      <div className="create-ticket-header">
        <div className="header-top">
          <button className="back-to-templates-btn" onClick={onCancel}>
            <i className="fas fa-arrow-left"></i>
            更换模板
          </button>
        </div>
        <div className="header-main">
          <div className="template-badge" style={{ backgroundColor: templateInfo?.color || '#3a86ff' }}>
            <i className={`fas ${templateInfo?.icon || 'fa-ticket-alt'}`}></i>
            <span>{templateInfo?.name || '通用工单'}</span>
          </div>
          <h2>创建新工单</h2>
          <p>填写工单信息，创建新的工单任务</p>
        </div>
      </div>

      <form className="create-ticket-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3 className="section-title">基本信息</h3>
          
          <div className="form-group">
            <label htmlFor="title">工单标题 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="请输入工单标题"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">详细描述</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="请详细描述工单内容、需求或问题..."
              rows={4}
              className="form-textarea"
            />
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">分类与优先级</h3>
          
          <div className="form-group">
            <label>工单分类</label>
            <div className="category-options">
              {categories.map(category => (
                <div
                  key={category.id}
                  className={`category-option ${formData.category === category.id ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                >
                  <i className={`fas ${category.icon}`}></i>
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>优先级</label>
              <div className="priority-options">
                {priorities.map(priority => (
                  <div
                    key={priority.id}
                    className={`priority-option ${formData.priority === priority.id ? 'selected' : ''}`}
                    style={{ '--priority-color': priority.color }}
                    onClick={() => setFormData(prev => ({ ...prev, priority: priority.id }))}
                  >
                    <span className="priority-dot"></span>
                    <span>{priority.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>紧急程度</label>
              <div className="urgency-options">
                {urgencyOptions.map(option => (
                  <div
                    key={option.id}
                    className={`urgency-option ${formData.urgency === option.id ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, urgency: option.id }))}
                  >
                    <span className="urgency-label">{option.name}</span>
                    <span className="urgency-description">{option.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">其他信息</h3>
          
          <div className="form-group">
            <label htmlFor="attachments">附件上传</label>
            <div className="attachment-upload">
              <div className="upload-area">
                <i className="fas fa-cloud-upload-alt"></i>
                <p>拖放文件到此处或点击上传</p>
                <input
                  type="file"
                  id="attachments"
                  name="attachments"
                  multiple
                  className="upload-input"
                />
              </div>
              <div className="upload-hint">
                支持图片、文档、压缩包等格式，单个文件不超过 20MB
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="deadline">截止时间</label>
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              className="form-input"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            取消
          </button>
          <button type="submit" className="btn-submit">
            创建工单
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTicket