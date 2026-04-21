import React from 'react'

function MyFavorites() {
  const favoriteCards = [
    {
      id: 1,
      title: '资产入库流程',
      category: 'resource',
      description: '资产入库的标准流程',
      favoriteDate: '2026-03-15',
      icon: 'fa-boxes-stacked'
    },
    {
      id: 2,
      title: '测试1',
      category: 'task',
      description: '测试工单1',
      favoriteDate: '2026-03-18',
      icon: 'fa-vial'
    },
    {
      id: 3,
      title: 'IM-HQ-20260415-0002_故障',
      category: 'security',
      description: '故障处理工单',
      favoriteDate: '2026-04-01',
      icon: 'fa-bug'
    },
    {
      id: 4,
      title: '总行基础设施变更流程',
      category: 'security',
      description: '用于实施设备维护、环境部署、网络调整等基础设施变更...',
      favoriteDate: '2026-04-05',
      icon: 'fa-server'
    },
    {
      id: 5,
      title: '分行及子公司基础设施变更流程',
      category: 'security',
      description: '用于实施设备维护、网络调整、分行系统运维、数据提取等...',
      favoriteDate: '2026-04-08',
      icon: 'fa-building'
    },
    {
      id: 6,
      title: '部署方案生成',
      category: 'resource',
      description: '生成部署方案',
      favoriteDate: '2026-04-10',
      icon: 'fa-file-code'
    },
    {
      id: 7,
      title: '例行变更-预审流程',
      category: 'changesence',
      description: '例行变更预审流程',
      favoriteDate: '2026-04-12',
      icon: 'fa-calendar-check'
    },
    {
      id: 8,
      title: '例行变更',
      category: 'changesence',
      description: '例行变更流程',
      favoriteDate: '2026-04-13',
      icon: 'fa-sync-alt'
    },
    {
      id: 9,
      title: '场景化变更模板管理流程',
      category: 'security',
      description: '用于对变更场景化模板进行日常管理的流程...',
      favoriteDate: '2026-04-15',
      icon: 'fa-th-large'
    },
    {
      id: 10,
      title: '标准变更模板管理流程',
      category: 'security',
      description: '用于对标准变更进行日常管理的流程...',
      favoriteDate: '2026-04-16',
      icon: 'fa-list-check'
    },
    {
      id: 11,
      title: '容器实例申请',
      category: 'resource',
      description: '容器实例申请',
      favoriteDate: '2026-04-18',
      icon: 'fa-docker'
    },
    {
      id: 12,
      title: '变更告警维护期自服务',
      category: 'changesence',
      description: '变更告警维护',
      favoriteDate: '2026-04-19',
      icon: 'fa-bell'
    }
  ]

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h2>我的收藏</h2>
        <span className="favorites-count">{favoriteCards.length} 个收藏项</span>
      </div>

      <div className="favorites-grid">
        {favoriteCards.map(card => (
          <div key={card.id} className="favorite-card">
            <div className="favorite-card-header">
              <div className="favorite-card-icon">
                <i className={`fas ${card.icon}`}></i>
              </div>
              <button className="unfavorite-btn" title="取消收藏">
                <i className="fas fa-star active"></i>
              </button>
            </div>
            <div className="favorite-card-body">
              <h3 className="favorite-card-title">{card.title}</h3>
              <p className="favorite-card-desc">{card.description}</p>
            </div>
            <div className="favorite-card-footer">
              <span className="favorite-date">
                <i className="far fa-clock"></i> 收藏于 {card.favoriteDate}
              </span>
              <button className="open-btn">打开</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyFavorites
