import React, { useState, useEffect, useRef } from 'react'

const strictControlPeriods = [
  { start: '2026-03-30', end: '2026-04-05', reason: '清明节前系统维稳' },
  { start: '2026-09-28', end: '2026-10-08', reason: '国庆黄金周严控' },
  { start: '2026-12-25', end: '2026-12-31', reason: '年终结算' },
  { start: '2026-06-01', end: '2026-06-07', reason: '高考期间' },
  { start: '2026-11-11', end: '2026-11-12', reason: '购物节保障' }
]

const changeWindows = [
  { type: 'simple', weeklyPattern: [1, 2, 3, 4, 5, 6, 0], timeRange: '18:00-次日06:00', description: '夜间变更窗口' },
  { type: 'standard', weeklyPattern: [6], occurrenceInMonth: 1, timeRange: '00:00-12:00', description: '月度标准变更' },
  { type: 'important', weeklyPattern: [0], occurrenceInMonth: 3, timeRange: '02:00-06:00', description: '月度重要变更' },
  { type: 'important', dates: ['2026-03-15', '2026-06-20', '2026-11-10'], timeRange: '22:00-次日02:00' },
  { type: 'major', dates: ['2026-05-01', '2026-10-01', '2026-12-25'], timeRange: '00:00-06:00' },
  { type: 'simple', dates: ['2026-03-15'], timeRange: '00:00-02:00', description: '凌晨简单变更' },
  { type: 'standard', dates: ['2026-03-15'], timeRange: '02:00-04:00', description: '凌晨标准变更' },
  { type: 'important', dates: ['2026-03-15'], timeRange: '04:00-06:00', description: '凌晨重要变更' },
  { type: 'major', dates: ['2026-03-15'], timeRange: '06:00-08:00', description: '早晨重大变更' },
  { type: 'simple', dates: ['2026-03-15'], timeRange: '08:00-10:00', description: '上午简单变更' },
  { type: 'standard', dates: ['2026-03-15'], timeRange: '10:00-12:00', description: '上午标准变更' },
  { type: 'important', dates: ['2026-03-15'], timeRange: '12:00-14:00', description: '中午重要变更' }
]

const holidays = [
  '2026-01-01', '2026-01-28', '2026-01-29', '2026-01-30', '2026-01-31',
  '2026-02-01', '2026-02-02', '2026-02-15', '2026-04-04', '2026-05-01',
  '2026-06-01', '2026-06-19', '2026-09-25', '2026-10-01', '2026-10-02', '2026-10-03'
]

const lunarData = {
  '2026-01-01': '冬月十三', '2026-01-28': '腊月廿八', '2026-01-29': '腊月廿九',
  '2026-01-30': '除夕', '2026-01-31': '大年初一', '2026-02-01': '正月初二',
  '2026-02-02': '正月初三', '2026-02-15': '正月十五', '2026-03-30': '二月十二',
  '2026-03-31': '二月十三', '2026-04-01': '二月十四', '2026-04-04': '二月十七',
  '2026-04-05': '二月十八', '2026-05-01': '三月十五', '2026-06-01': '四月十六',
  '2026-06-19': '五月初五', '2026-09-25': '八月十五', '2026-10-01': '八月廿一',
  '2026-12-25': '冬月十七'
}

function WorkCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1))
  const [isEditMode, setIsEditMode] = useState(false)
  const [editModeChanges, setEditModeChanges] = useState({})
  const [workdayStatus, setWorkdayStatus] = useState({
    'default': { 1: 'working', 2: 'working', 3: 'working', 4: 'working', 5: 'working', 6: 'non-working', 0: 'non-working' },
    'custom': {}
  })
  const [showPopup, setShowPopup] = useState(false)
  const [popupData, setPopupData] = useState({ date: '', windows: [], x: 0, y: 0 })
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const formatDate = (date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const parseDate = (dateStr) => {
    const parts = dateStr.split('-')
    return new Date(parts[0], parts[1] - 1, parts[2])
  }

  const isInStrictControlPeriod = (dateStr) => {
    for (const period of strictControlPeriods) {
      if (dateStr >= period.start && dateStr <= period.end) {
        return period
      }
    }
    return null
  }

  const getStrictControlConnectors = (dateStr, dateObj) => {
    const connectors = []
    const prevDate = new Date(dateObj)
    prevDate.setDate(prevDate.getDate() - 1)
    const prevDateStr = formatDate(prevDate)
    
    const nextDate = new Date(dateObj)
    nextDate.setDate(nextDate.getDate() + 1)
    const nextDateStr = formatDate(nextDate)
    
    if (isInStrictControlPeriod(prevDateStr)) connectors.push('left')
    if (isInStrictControlPeriod(nextDateStr)) connectors.push('right')
    
    return connectors
  }

  const getChangeWindowsForDate = (dateObj) => {
    const dateStr = formatDate(dateObj)
    const dayOfWeek = dateObj.getDay()
    const dayOfMonth = dateObj.getDate()
    const windows = []

    for (const window of changeWindows) {
      let match = false
      if (window.dates) {
        match = window.dates.includes(dateStr)
      } else if (window.weeklyPattern) {
        match = window.weeklyPattern.includes(dayOfWeek)
        if (match && window.occurrenceInMonth) {
          const firstDayOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1)
          const firstDayOfMonthWeekday = firstDayOfMonth.getDay()
          let firstTargetDate = 1
          if (window.weeklyPattern[0] >= firstDayOfMonthWeekday) {
            firstTargetDate += (window.weeklyPattern[0] - firstDayOfMonthWeekday)
          } else {
            firstTargetDate += (7 - firstDayOfMonthWeekday + window.weeklyPattern[0])
          }
          const targetDate = firstTargetDate + (window.occurrenceInMonth - 1) * 7
          match = (dayOfMonth === targetDate)
        }
      }
      if (match) {
        windows.push({
          type: window.type,
          timeRange: window.timeRange || '全天',
          description: window.description || ''
        })
      }
    }
    return windows
  }

  const getLunar = (dateStr) => lunarData[dateStr] || ''

  const isWeekend = (dayOfWeek) => dayOfWeek === 0 || dayOfWeek === 6

  const isHoliday = (dateStr) => holidays.includes(dateStr)

  const isWorkdayAdjustment = (dateStr, dayOfWeek) => {
    if (workdayStatus.custom[dateStr] === 'working') {
      if (isWeekend(dayOfWeek) || isHoliday(dateStr)) {
        return true
      }
    }
    return false
  }

  const getWorkdayStatus = (dateStr, dayOfWeek) => {
    if (isEditMode && editModeChanges[dateStr] !== undefined) {
      return editModeChanges[dateStr]
    }
    if (workdayStatus.custom[dateStr]) {
      return workdayStatus.custom[dateStr]
    }
    return workdayStatus.default[dayOfWeek]
  }

  const toggleWorkdayStatusInEditMode = (dateStr) => {
    if (!isEditMode) return
    
    const dayOfWeek = parseDate(dateStr).getDay()
    const currentStatus = getWorkdayStatus(dateStr, dayOfWeek)
    
    setEditModeChanges(prev => ({
      ...prev,
      [dateStr]: currentStatus === 'working' ? 'non-working' : 'working'
    }))
  }

  const enterEditMode = () => {
    setIsEditMode(true)
    setEditModeChanges({})
    alert('已进入编辑模式，可以点击日期格子切换工作日状态。编辑完成后请点击"保存修改"按钮。')
  }

  const exitEditMode = () => {
    setIsEditMode(false)
    setEditModeChanges({})
  }

  const handleSave = () => {
    const modifiedCount = Object.keys(editModeChanges).length
    
    if (modifiedCount === 0) {
      exitEditMode()
      return
    }
    
    setShowConfirmDialog(true)
  }

  const confirmSave = () => {
    setWorkdayStatus(prev => {
      const newCustom = { ...prev.custom }
      Object.keys(editModeChanges).forEach(dateStr => {
        newCustom[dateStr] = editModeChanges[dateStr]
      })
      return { ...prev, custom: newCustom }
    })
    
    setShowConfirmDialog(false)
    exitEditMode()
    alert('工作日设置已保存！')
  }

  const cancelSave = () => {
    setShowConfirmDialog(false)
  }

  const handleCellClick = (e, dateStr, dateObj) => {
    if (e.target.classList.contains('more-btn')) {
      e.stopPropagation()
      const windows = getChangeWindowsForDate(dateObj)
      setPopupData({
        date: dateStr,
        windows,
        x: e.clientX,
        y: e.clientY
      })
      setShowPopup(true)
      return
    }
    
    if (isEditMode) {
      toggleWorkdayStatusInEditMode(dateStr)
    }
  }

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  const handleNextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value)
    if (year >= 2000 && year <= 2100) {
      const newDate = new Date(currentDate)
      newDate.setFullYear(year)
      setCurrentDate(newDate)
    }
  }

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value)
    const newDate = new Date(currentDate)
    newDate.setMonth(month)
    setCurrentDate(newDate)
  }

  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const startingDayOfWeek = firstDayOfMonth.getDay()
    const totalDays = lastDayOfMonth.getDate()
    const prevMonthLastDay = new Date(year, month, 0).getDate()

    const days = []
    let date = 1

    for (let row = 0; row < 6; row++) {
      const week = []
      for (let col = 0; col < 7; col++) {
        let cellDate, cellDateStr, isCurrentMonth = false

        if (row === 0 && col < startingDayOfWeek) {
          const dayNum = prevMonthLastDay - startingDayOfWeek + col + 1
          cellDate = new Date(year, month - 1, dayNum)
          cellDateStr = formatDate(cellDate)
        } else if (date > totalDays) {
          const dayNum = date - totalDays
          cellDate = new Date(year, month + 1, dayNum)
          cellDateStr = formatDate(cellDate)
          date++
        } else {
          cellDate = new Date(year, month, date)
          cellDateStr = formatDate(cellDate)
          isCurrentMonth = true
          date++
        }

        const lunar = getLunar(cellDateStr)
        const strictControlInfo = isInStrictControlPeriod(cellDateStr)
        const changeWindows = getChangeWindowsForDate(cellDate)
        const isHolidayDay = isHoliday(cellDateStr)
        const workdayStatusType = getWorkdayStatus(cellDateStr, cellDate.getDay())
        const isWorkdayAdjust = isWorkdayAdjustment(cellDateStr, cellDate.getDay())
        const strictControlConnectors = strictControlInfo 
          ? getStrictControlConnectors(cellDateStr, cellDate) 
          : []

        let cellClass = 'clickable'
        if (!isCurrentMonth) cellClass += ' other-month'
        if (formatDate(cellDate) === formatDate(today)) cellClass += ' today'
        if (isWeekend(cellDate.getDay())) cellClass += ' weekend'
        if (workdayStatusType === 'working') cellClass += ' working-day'
        else cellClass += ' non-working-day'
        if (isEditMode && isCurrentMonth) cellClass += ' edit-mode-highlight'

        week.push({
          date: cellDate,
          dateStr: cellDateStr,
          isCurrentMonth,
          lunar,
          strictControlInfo,
          changeWindows,
          isHolidayDay,
          isWorkdayAdjust,
          strictControlConnectors,
          cellClass
        })
      }
      days.push(week)
      if (date > totalDays && row > 3) break
    }

    return days
  }

  const calendarDays = renderCalendar()
  const monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

  return (
    <div className={`calendar-container ${isEditMode ? 'edit-mode' : ''}`}>
      <div className="calendar-wrapper-inner" id="main-container">
        <div className="calendar-header">
          <h1>变更管理日历</h1>
          <p className="subtitle">特殊工作日设置 | 编辑模式 | 调休标记</p>
        </div>

        <div className="calendar-controls">
          <div className="date-selector">
            <div className="year-selector">
              <input
                type="number"
                id="year-input"
                min="2000"
                max="2100"
                value={currentDate.getFullYear()}
                onChange={handleYearChange}
              />
              <span style={{ color: '#003d7a', fontWeight: 600, fontSize: '1.1em' }}>年</span>
            </div>
            
            <div className="month-selector">
              <select
                id="month-select"
                value={currentDate.getMonth()}
                onChange={handleMonthChange}
              >
                {monthNames.map((name, index) => (
                  <option key={index} value={index}>{name}</option>
                ))}
              </select>
              <span style={{ color: '#003d7a', fontWeight: 600, fontSize: '1.1em' }}>月</span>
            </div>
          </div>
          
          <div className="nav-buttons">
            <button onClick={handlePrevMonth}>
              <span>◀</span> 上月
            </button>
            <button onClick={handleToday} className="today-btn">
              今天
            </button>
            <button onClick={handleNextMonth}>
              下月 <span>▶</span>
            </button>
            {!isEditMode ? (
              <button onClick={enterEditMode} className="edit-mode-btn">
                设置特殊工作日
              </button>
            ) : (
              <button onClick={handleSave} className="save-btn">
                保存修改
              </button>
            )}
          </div>
        </div>

        <div className="legend">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#ffcccc', border: '2px solid #ff6666' }}></span>
            严控期（红色横条）
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#a3d977', border: '2px solid #8bc34a' }}></span>
            简单变更
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#6bb5ff', border: '2px solid #2196f3' }}></span>
            标准变更
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#ffb366', border: '2px solid #ff9800' }}></span>
            重要变更
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#ff8080', border: '2px solid #f44336' }}></span>
            重大变更
          </div>
          <div className="legend-item">
            <span style={{
              width: 20, height: 20, borderRadius: '50%', backgroundColor: '#e60000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 'bold', fontSize: '0.7em'
            }}>休</span>
            节假日
          </div>
          <div className="legend-item">
            <span style={{
              width: 20, height: 20, borderRadius: '50%', backgroundColor: '#0066cc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 'bold', fontSize: '0.7em'
            }}>调</span>
            调休日
          </div>
          <div className="legend-item">
            <span style={{
              width: 20, height: 20, borderRadius: 4,
              backgroundColor: '#f0fff0', border: '1px solid #4CAF50',
              display: 'inline-block'
            }}></span>
            工作日背景
          </div>
          <div className="legend-item">
            <span style={{
              width: 20, height: 20, borderRadius: 4,
              backgroundColor: '#fff0f0', border: '1px solid #FF9800',
              display: 'inline-block'
            }}></span>
            非工作日背景
          </div>
          <div className="legend-item">
            <span style={{
              width: 20, height: 20, borderRadius: 4,
              border: '2px dashed #4CAF50', display: 'inline-block'
            }}></span>
            编辑模式高亮
          </div>
        </div>

        <div className="calendar-table-wrapper">
          <table className="calendar-table" id="calendar">
            <thead>
              <tr>
                <th>周日</th>
                <th>周一</th>
                <th>周二</th>
                <th>周三</th>
                <th>周四</th>
                <th>周五</th>
                <th>周六</th>
              </tr>
            </thead>
            <tbody>
              {calendarDays.map((week, rowIndex) => (
                <tr key={rowIndex}>
                  {week.map((day, colIndex) => (
                    <td
                      key={colIndex}
                      className={day.cellClass}
                      data-date={day.dateStr}
                      onClick={(e) => handleCellClick(e, day.dateStr, day.date)}
                    >
                      {day.strictControlInfo && (
                        <>
                          <div className="strict-control-bar" title="严控期"></div>
                          {day.strictControlConnectors.map((connector, i) => (
                            <div key={i} className={`strict-control-connector ${connector}`}></div>
                          ))}
                        </>
                      )}
                      
                      <div className="date-header">
                        <div className="date-num">{day.date.getDate()}</div>
                        {day.lunar && <div className="lunar">{day.lunar}</div>}
                      </div>
                      
                      {day.isHolidayDay && !day.isWorkdayAdjust && (
                        <div className="holiday-marker" title="节假日">休</div>
                      )}
                      {day.isWorkdayAdjust && (
                        <div className="workday-marker" title="调休日">调</div>
                      )}
                      
                      {day.strictControlInfo && day.isCurrentMonth && (
                        <div className="current-period-info" title={day.strictControlInfo.reason}>
                          {day.strictControlInfo.reason.substring(0, 8)}...
                        </div>
                      )}
                      
                      {day.changeWindows.length > 0 && (
                        <>
                          <div className="change-windows">
                            {day.changeWindows.slice(0, 2).map((window, i) => {
                              const typeText = window.type === 'simple' ? '简' :
                                window.type === 'standard' ? '标' :
                                window.type === 'important' ? '重' : '大'
                              return (
                                <div key={i} className={`change-window ${window.type}`} title={`${typeText}变更 ${window.timeRange}`}>
                                  {typeText} {window.timeRange}
                                </div>
                              )
                            })}
                          </div>
                          {day.changeWindows.length > 2 && (
                            <span className="more-btn" data-date={day.dateStr}>
                              更多
                            </span>
                          )}
                        </>
                      )}
                      
                      {isEditMode && day.isCurrentMonth && editModeChanges[day.dateStr] && (
                        <div style={{ position: 'absolute', bottom: 30, right: 8, fontSize: '0.7em', color: '#4CAF50', fontWeight: 'bold' }}>
                          已修改
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="footer-note">
          <p>提示：严控期显示为日期格子上方的红色横条，节假日以红色圆形"休"字标记，调休日以深蓝色圆形"调"字标记。点击"设置特殊工作日"进入编辑模式，此时可点击日期格子切换工作日状态，编辑完成后点击"保存修改"保存更改。</p>
          <p>变更窗口默认显示前两个，点击"更多"按钮查看所有变更窗口。</p>
        </div>
      </div>

      {/* Change Popup */}
      <div className={`change-popup ${showPopup ? 'visible' : ''}`} style={{ left: popupData.x, top: popupData.y }}>
        <div className="change-popup-header">
          {popupData.date && parseDate(popupData.date) && 
            `${parseDate(popupData.date).getFullYear()}年${parseDate(popupData.date).getMonth() + 1}月${parseDate(popupData.date).getDate()}日 变更窗口`
          }
        </div>
        <div className="change-popup-content">
          {popupData.windows && popupData.windows.length > 0 ? (
            popupData.windows.map((window, index) => {
              const typeText = window.type === 'simple' ? '简单' :
                window.type === 'standard' ? '标准' :
                window.type === 'important' ? '重要' : '重大'
              return (
                <div key={index} className={`change-popup-item ${window.type}`}>
                  <span className={`change-popup-type ${window.type}`}>{typeText}</span>
                  <span className="change-popup-time">{window.timeRange}</span>
                  {window.description && (
                    <div style={{ marginTop: 5, color: '#666', fontSize: '0.85em' }}>{window.description}</div>
                  )}
                </div>
              )
            })
          ) : (
            <div style={{ padding: 20, textAlign: 'center', color: '#888' }}>无变更窗口</div>
          )}
        </div>
      </div>

      {/* Confirm Dialog */}
      <div className={`confirm-dialog ${showConfirmDialog ? '' : 'hidden'}`}>
        <div className="confirm-content">
          <div className="confirm-header">确认保存</div>
          <div className="confirm-message">
            您已修改了 <span id="modified-count">{Object.keys(editModeChanges).length}</span> 个工作日的状态。确定要保存这些修改吗？
          </div>
          <div className="confirm-buttons">
            <button onClick={cancelSave} className="confirm-btn confirm-cancel">取消</button>
            <button onClick={confirmSave} className="confirm-btn confirm-ok">确定保存</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkCalendar
