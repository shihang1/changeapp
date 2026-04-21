import React, { useState, useEffect } from 'react'

const cardData = {
  all: [
    { id: 1, title: "资产入库流程", category: "resource", favorite: true, description: "资产入库的标准流程" },
    { id: 2, title: "设备上架流程", category: "resource", favorite: false, description: "新设备上架的标准流程" },
    { id: 3, title: "技术整体方案+多云管理+256", category: "change", favorite: false, description: "技术整体方案与多云管理" },
    { id: 4, title: "测试2", category: "task", favorite: false, description: "测试工单2" },
    { id: 5, title: "测试1", category: "task", favorite: true, description: "测试工单1" },
    { id: 6, title: "故障管理", category: "security", favorite: false, description: "故障管理流程" },
    { id: 7, title: "自动化管理", category: "task", favorite: false, description: "自动化管理流程" },
    { id: 8, title: "IM-HQ-20260415-0002_故障", category: "security", favorite: true, description: "故障处理工单" },
    { id: 9, title: "分派值班表人员", category: "task", favorite: false, description: "值班人员分派" },
    { id: 10, title: "待处理", category: "task", favorite: false, description: "待处理工单" },
    { id: 23, title: "总行基础设施变更流程", category: "security", favorite: true, description: "用于实施设备维护、环境部署、网络调整、应用系统运维、数据提取等基础设施变更，实现对该类变更的制定、审核、预审、评审、审批、实施、反馈、关闭等操作" },
    { id: 24, title: "分行及子公司基础设施变更流程", category: "security", favorite: true, description: "用于实施设备维护、网络调整、分行系统运维、数据提取等基础设施变更，实现对该类变更的制定、审批、报备、实施、反馈、关闭等操作" },
  ],
  change: [
    { id: 23, title: "总行基础设施变更流程", category: "security", favorite: true, description: "用于实施设备维护、环境部署、网络调整、应用系统运维、数据提取等基础设施变更，实现对该类变更的制定、审核、预审、评审、审批、实施、反馈、关闭等操作" },
    { id: 24, title: "分行及子公司基础设施变更流程", category: "security", favorite: true, description: "用于实施设备维护、网络调整、分行系统运维、数据提取等基础设施变更，实现对该类变更的制定、审批、报备、实施、反馈、关闭等操作" },
    { id: 25, title: "场景化变更模板管理流程", category: "security", favorite: true, description: "用于对变更场景化模板进行日常管理的流程，包括模板修订（录入、修改、删除）、模板审核、模板审批、模板评审等全生命周期环节" },
    { id: 26, title: "标准变更模板管理流程", category: "security", favorite: true, description: "用于对标准变更进行日常管理的流程，包括标准变更的修订（录入、修改、删除）、审核、审批、评审、预授权等全生命周期环节" },
  ],
  changesence: [
    { id: 11, title: "例行变更-预审流程", category: "change", favorite: true, description: "例行变更预审流程" },
    { id: 12, title: "普通变更目录申请", category: "change", favorite: false, description: "普通变更目录申请" },
    { id: 13, title: "例行变更", category: "change", favorite: true, description: "例行变更流程" },
    { id: 14, title: "普通变更", category: "change", favorite: false, description: "普通变更流程" },
    { id: 15, title: "特急变更", category: "change", favorite: false, description: "特急变更流程" },
    { id: 16, title: "变更告警维护期自服务", category: "change", favorite: true, description: "变更告警维护" },
  ],
  resource: [
    { id: 17, title: "部署方案生成", category: "resource", favorite: true, description: "生成部署方案" },
    { id: 18, title: "IAAS实例申请", category: "resource", favorite: false, description: "IAAS实例申请流程" },
    { id: 19, title: "容器实例申请", category: "resource", favorite: true, description: "容器实例申请" },
    { id: 20, title: "资源释放", category: "resource", favorite: false, description: "资源释放流程" },
    { id: 21, title: "部署方案生成(演练)", category: "resource", favorite: false, description: "演练部署方案生成" },
    { id: 22, title: "部署方案生成(灾备)", category: "resource", favorite: false, description: "灾备部署方案生成" },
  ]
}

const categories = [
  { id: "all", name: "全部" },
  { id: "favorites", name: "我的收藏" },
  { id: "change", name: "变更管理" },
  { id: "changesence", name: "场景化变更" },
  { id: "resource", name: "标准变更" },
  { id: "task", name: "服务请求" },
]

function CardsGrid({ pageType, pageTitle, onTitleChange }) {
  const [currentCategory, setCurrentCategory] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [cards, setCards] = useState(cardData.all.map(c => ({ ...c })))

  useEffect(() => {
    setCurrentCategory(pageType === 'favorites' ? 'favorites' : 'all')
    setSearchKeyword('')
  }, [pageType])

  const getFilteredCards = (category) => {
    let filteredCards = []
    
    if (category === 'favorites') {
      filteredCards = [
        ...cardData.all,
        ...cardData.change,
        ...cardData.resource,
        ...cardData.changesence
      ].filter(card => card.favorite)
    } else if (cardData[category]) {
      filteredCards = cardData[category]
    } else if (category === 'all') {
      filteredCards = [
        ...cardData.all,
        ...cardData.change,
        ...cardData.resource,
        ...cardData.changesence
      ]
    }

    if (searchKeyword) {
      filteredCards = filteredCards.filter(card => 
        card.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        card.description.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    }

    return filteredCards
  }

  const handleCategoryChange = (categoryId) => {
    setCurrentCategory(categoryId)
    setSearchKeyword('')
    
    const category = categories.find(c => c.id === categoryId)
    if (category && onTitleChange) {
      onTitleChange(category.name)
    }
  }

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value)
  }

  const toggleFavorite = (cardId) => {
    const allCards = [cardData.all, cardData.change, cardData.resource, cardData.changesence]
    
    for (const group of allCards) {
      const card = group.find(c => c.id === cardId)
      if (card) {
        card.favorite = !card.favorite
        break
      }
    }
    
    setCards([...getFilteredCards(currentCategory).map(c => ({ ...c }))])
  }

  const handleCardClick = (card) => {
    alert(`打开工单: ${card.title}`)
  }

  const filteredCards = getFilteredCards(currentCategory)

  return (
    <div className="content-area visible">
      <div className="header-row">
        <h1 className="page-title" id="pageTitle">{pageTitle}</h1>
      </div>
      
      <div className="category-tabs">
        <div className="category-search-box">
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="搜索工单..." 
            value={searchKeyword}
            onChange={handleSearchChange}
          />
        </div>
        
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-tab ${currentCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
      
      <div className="cards-grid">
        {filteredCards.length > 0 ? (
          filteredCards.map(card => (
            <div 
              key={card.id} 
              className={`card ${card.id === 17 ? 'highlighted' : ''}`}
              onClick={() => handleCardClick(card)}
            >
              <div className="card-icon">
                <i className="fas fa-wrench"></i>
              </div>
              <button 
                className={`favorite-btn ${card.favorite ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(card.id)
                }}
              >
                <i className="fas fa-star"></i>
              </button>
              <div className="card-title">{card.title}</div>
              <div className="card-desc">{card.description}</div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <p>没有找到匹配的工单</p>
            {searchKeyword && <p>关键词: "{searchKeyword}"</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default CardsGrid
