import React from 'react'

function Drafts() {
  // 模拟草稿数据
  const draftItems = [
    {
      id: 1,
      title: '资产入库流程',
      lastSaved: '2026-04-20 14:30',
      category: 'resource'
    },
    {
      id: 2,
      title: '分行基础设施变更申请',
      lastSaved: '2026-04-19 09:15',
      category: 'security'
    },
    {
      id: 3,
      title: '容器实例申请',
      lastSaved: '2026-04-18 16:45',
      category: 'resource'
    },
    {
      id: 4,
      title: '例行变更-预审流程',
      lastSaved: '2026-04-17 11:20',
      category: 'changesence'
    },
    {
      id: 5,
      title: '场景化变更模板管理流程',
      lastSaved: '2026-04-16 13:10',
      category: 'security'
    },
    {
      id: 6,
      title: '变更告警维护期自服务',
      lastSaved: '2026-04-15 10:05',
      category: 'changesence'
    },
    {
      id: 7,
      title: '测试工单1',
      lastSaved: '2026-04-14 15:30',
      category: 'task'
    },
    {
      id: 8,
      title: '故障处理工单',
      lastSaved: '2026-04-13 09:45',
      category: 'security'
    }
  ]

  const handleDelete = (id) => {
    if (window.confirm('确定要删除这个草稿吗？删除后无法恢复。')) {
      alert(`删除草稿 ID: ${id}`)
      // 实际应用中这里会有删除逻辑
    }
  }

  const handleEdit = (id) => {
    alert(`编辑草稿 ID: ${id}`)
    // 实际应用中这里会有编辑/打开草稿的逻辑
  }

  return (
    <div className="drafts-container">
      <div className="drafts-header">
        <h2>草稿箱</h2>
        <span className="drafts-count">{draftItems.length} 个草稿</span>
      </div>

      <div className="drafts-table-container">
        <table className="drafts-table">
          <thead>
            <tr>
              <th className="col-title">工单标题</th>
              <th className="col-time">保存时间</th>
              <th className="col-actions">操作</th>
            </tr>
          </thead>
          <tbody>
            {draftItems.map(item => (
              <tr key={item.id} className="draft-row">
                <td className="draft-title" onClick={() => handleEdit(item.id)}>
                  <div className="draft-title-content">
                    <i className={`fas fa-file-alt draft-icon ${item.category}`}></i>
                    <span>{item.title}</span>
                  </div>
                </td>
                <td className="draft-time">
                  <i className="far fa-clock"></i>
                  {item.lastSaved}
                </td>
                <td className="draft-actions">
                  <button className="action-btn edit-btn" onClick={() => handleEdit(item.id)}>
                    <i className="fas fa-edit"></i> 编辑
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(item.id)}>
                    <i className="fas fa-trash"></i> 删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Drafts