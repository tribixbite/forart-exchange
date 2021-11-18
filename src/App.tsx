import React from 'react'
import './App.css'
import { Layout } from 'antd'
import { Header } from 'antd/es/layout/layout'
import AppHeader from './layout/AppHeader'
import AppSideBar from './layout/AppSideBar'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
// @ts-ignore
import { Route } from 'react-router-dom'
import routes from './routes'


function App() {
  return (
    <Layout className="app">
      <Header style={{ padding:'0' }}>
        <AppHeader />
      </Header>
      <Layout>
        {/* <Layout.Sider
          style={{
            position: 'fixed',
            zIndex: 99,
            top: '64px'
          }}
        >
          <AppSideBar />
        </Layout.Sider>
        <Layout.Content
          style={{
            backgroundColor: '#0B111E',
            position: 'relative',
            left: '200px',
            width:'fit-content'
          }}
        >
          <div
            style={{ width: 'calc(100vw - 200px)' }}
          >
            {
              routes.map((route: any) => (
                <Route path={route.path}
                  exact
                  component={route.component}
                  key={route.path}
                />
              ))
            }
          </div>
        </Layout.Content>*/}
        <Layout>
          <Sider width="220px">
            <AppSideBar />
          </Sider>
          <Content style={{ display: 'flex', width:'calc(100vw - 220px)', backgroundColor:'black' }}>
            {
              routes.map(router => (
                <Route
                  path={router.path}
                  exact
                  component={router.component}
                  key={router.path}
                />
              ))
            }
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App