import React from 'react'
// @ts-ignore
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import routes, { Route } from '../../routes'
import TwitterIcon from '../../assets/images/contactLink/twitter.png'
import TelegramIcon from '../../assets/images/contactLink/telegram.png'
import WebsiteIcon from '../../assets/images/contactLink/website.png'
import DiscordIcon from '../../assets/images/contactLink/discord.png'

const AppSideBarContent = styled.div`
  height: 100%;
  min-height: 100vh;
  padding-left: 20px;
  background: #04111D;
  font-weight: bold;
  position: relative;
  border-right: 1px solid #262531;
  z-index: 99;
  top: 60px;

  .ant-menu-root.ant-menu-vertical,
  .ant-menu-root.ant-menu-vertical-left,
  .ant-menu-root.ant-menu-vertical-right,
  .ant-menu-root.ant-menu-inline {
    background: #04111D !important;
    box-shadow: none;
  }
`

const CustomizedMenu = styled(Menu)`
  
  
  
  .ant-menu-item {
    display: flex;
    align-items: center;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;

    svg {
      width: 1.7rem;

      line {
        shape-rendering: crispEdges;
      }
    }
  }


  .ant-menu-item-selected {
    background-color: #1F252B !important;

    a {
      color: white !important;
    }

    &:after {
      border-right: none !important;
    }
  }

  .ant-menu-item-active:not(.ant-menu-item-selected) {
    background-color: #161A1F !important;
  }
  
  .ant-menu-title-content {
    display: flex;
    align-items: center;
    img {
      width: 18px;
      margin-right: 10px;
    }
  }
  
`

const LinkContainer = styled.div`
  position: fixed;
  width: 200px;
  height: 50px;
  bottom: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const SCExternalLink = styled.a`
  img {
    width: 30px;
  }
  `

const AppSideBar:React.FC = () => {
  const { pathname } = useLocation()

  const selectedKey: string = (() => {
    return routes.filter(route => route.path === pathname || route.match?.test(pathname))[0]?.path
  })()

  const EXTERNAL_LINKS: Array<{ icon: string, link: string }> = [
    { icon: TwitterIcon, link: 'https://twitter.com/forart_ai' },
    { icon: TelegramIcon, link: 'https://t.me/forart_co' },
    { icon: DiscordIcon, link: 'https://discord.gg/RDaUkaW39S' },
    { icon: WebsiteIcon, link:'https://forart.co/' }
  ]


  return (
    <AppSideBarContent>
      <CustomizedMenu
        selectedKeys={[selectedKey]}
        mode="inline"
        theme="dark"
      >
        {
          routes.filter(route => !route.hidden).map((route: Route) => {
            const fillColor = (route.path === pathname || route.match?.test(pathname)) ? 'white' : '#fff'

            return (
              <Menu.Item key={route.path} disabled={route.disable} >
                <img src={route.icon} className="menu-icon" />
                <Link to={route.path}>
                  {route.title}
                </Link>
              </Menu.Item>
            )
          })
        }
      </CustomizedMenu>

      <LinkContainer >
        {
          EXTERNAL_LINKS.map(({ icon,link }) => (
            <SCExternalLink key={link} href={link} target="_blank" rel="noreferrer">
              <img src={icon} alt={link} />
            </SCExternalLink>
          ))
        }
      </LinkContainer>
    </AppSideBarContent>
  )
}

export default AppSideBar
