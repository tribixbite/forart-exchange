import React from 'react'
// @ts-ignore
import styled from 'styled-components'
// @ts-ignore
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import routes, { Route } from '../../routes'

const AppSideBarContent = styled.div`
  height: 100%;
  min-height: 100vh;
  background: black;
  position: relative;
  z-index: 11;

  .ant-menu-root.ant-menu-vertical,
  .ant-menu-root.ant-menu-vertical-left,
  .ant-menu-root.ant-menu-vertical-right,
  .ant-menu-root.ant-menu-inline {
    background: #101A2D !important;
    box-shadow: none;
  }
`

const CustomizedMenu = styled(Menu)`
  .ant-menu-item {
    display: flex;
    align-items: center;

    svg {
      width: 1.7rem;

      line {
        shape-rendering: crispEdges;
      }
    }
  }


  .ant-menu-item-selected {
    background-color: rgb(25, 45, 79) !important;

    a {
      color: white !important;
    }

    &:after {
      border-right: none !important;
    }
  }

  .ant-menu-item-active:not(.ant-menu-item-selected) {
    background-color: rgb(25, 45, 79) !important;
  }
`

const AppSideBar:React.FC = () => {
  const { pathname } = useLocation()

  const selectedKey: string = (() => {
    return routes.filter(route => route.path === pathname || route.match?.test(pathname))[0]?.path
  })()


  return (
    <AppSideBarContent>
      <CustomizedMenu
        selectedKeys={[selectedKey]}
        mode="inline"
        theme="dark"
      >
        {
          routes.filter(route => !route.hidden).map((route: Route) => {
            // const fillColor = (route.path === pathname || route.match?.test(pathname)) ? 'white' : '#fff'

            return (
              <Menu.Item key={route.path} disabled={route.disable}>
                <Link to={route.path}>
                  {route.title}
                </Link>
              </Menu.Item>
            )
          })
        }
      </CustomizedMenu>
    </AppSideBarContent>
  )
}

export default AppSideBar
