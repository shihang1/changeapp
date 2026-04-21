import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import WelcomePage from './components/WelcomePage'
import CardsGrid from './components/CardsGrid'
import WorkCalendar from './components/WorkCalendar'
import ChangeView from './components/ChangeView'
import Overview from './components/Overview'
import MyTodo from './components/MyTodo'
import GroupTodo from './components/GroupTodo'
import MyFavorites from './components/MyFavorites'
import MyParticipation from './components/MyParticipation'
import MyCreated from './components/MyCreated'
import Drafts from './components/Drafts'
import AllTickets from './components/AllTickets'
import ArchivedTickets from './components/ArchivedTickets'
import ChangeReport from './components/ChangeReport'

function App() {
  const [activeNav, setActiveNav] = useState('home')

  const handleNavClick = (nav) => {
    if (nav === 'home') {
      setActiveNav('home')
    } else {
      setActiveNav(nav)
    }
  }

  const handleNewClick = () => {
    alert('新建工单功能')
  }

  const renderContent = () => {
    switch (activeNav) {
      case 'home':
        return (
          <div className="welcome-container">
            <WelcomePage onNewClick={handleNewClick} />
          </div>
        )
      case 'workCalendar':
        return <WorkCalendar />
      case 'changeView':
        return <ChangeView />
      case 'changeReport':
        return <ChangeReport />
      case 'overview':
        return <Overview />
      case 'myTodo':
        return <MyTodo />
      case 'groupTodo':
        return <GroupTodo />
      case 'myFavorites':
        return <MyFavorites />
      case 'myParticipation':
        return <MyParticipation />
      case 'myCreated':
        return <MyCreated />
      case 'allTickets':
        return <AllTickets />
      case 'archived':
        return <ArchivedTickets />
      case 'drafts':
        return <Drafts />
      default:
        return <CardsGrid pageType={activeNav} pageTitle={getNavTitle(activeNav)} onTitleChange={() => {}} />
    }
  }

  const getNavTitle = (nav) => {
    const titles = {
      allTickets: '所有工单',
      changeReport: '变更报告',
      archived: '归档工单',
      drafts: '草稿箱'
    }
    return titles[nav] || nav
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar 
        activeNav={activeNav} 
        onNavClick={handleNavClick} 
        onNewClick={handleNewClick} 
      />
      
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  )
}

export default App
