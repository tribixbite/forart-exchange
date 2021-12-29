import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { ArtistKit, UserDetail } from '../../types/userDetail'
import { useArtistDetailQuery } from '../../hooks/queries/useArtistDetailQuery'

import HeaderBack from '../../assets/images/artistDetail/cool-background.png'
import { Anchor, Avatar, Switch, Tabs } from 'antd'
import { DollarOutlined, SmileOutlined } from '@ant-design/icons'
import {
  AIContainer,
  AIContent,
  BodyContent,
  CenterContainer,
  KitContent,
  MintButton,
  MintContainer,
  MintTab,
  MintWrapper,
  PriceContainer,
  SelectedBody,
  StyledSwitch,
  TopContainer
} from './artistMint.style'
import { useArtistKitQuery } from '../../hooks/queries/useArtistKitQuery'

import { SelectableBodyList } from '../../components/nft-mint/mintBody'
import { SelectableKitList } from '../../components/nft-mint/mintKit'
import { SelectedList } from '../../components/nft-mint/selectedList'
import { SelectableNFTList } from '../../components/nft-mint/styleNft'
import useNFTMint from '../../hooks/contract/service/useNFTMint'
import { useStyledNFTsQuery } from '../../hooks/queries/useStyledNFTsQuery'
import { useMediaQuery } from 'react-responsive'


const { TabPane } = Tabs
const { Link } = Anchor

const onAnchorClick = (
  e: React.MouseEvent<HTMLElement>,
  link: {
    title: React.ReactNode;
    href: string;
  },
) => {
  e.preventDefault()
  console.log(link)
}

export type KitProperties = {
  id: number
  url: string,
  price: number,
  rarity: number,
  remain: number
}

function scrollToPart(anchorName: string) {
  if (anchorName) {
    const anchorElement = document.getElementById(anchorName)
    if (anchorElement) {
      anchorElement.scrollIntoView(
        { behavior: 'smooth', block: 'nearest' }
      )
    }
  }
}


const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  height: fit-content;
  margin: auto;
  //padding-bottom: 50px;
  padding: 30px 20px;
  
 @media screen and (max-width: 1100px) {
   height: auto;
 } 
`

const ArtistDetailContainer = styled.div`
  max-width: 1900px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`

const HeaderContainer = styled.div<{backgroundImage?: string}>`
  width: 100%;
  height: 800px;
  border-radius: 20px;
  margin-top: 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //background: #2A2E35;
  padding: 2rem 2.2rem;
  flex-direction: column;
  background: linear-gradient(0deg, rgba(14,22,39,.8),rgba(36,52,84,.8)) border-box;
  


  ${props => props.backgroundImage && `
 background: url(${HeaderBack}) no-repeat center;
 background-size: cover;
 `
};
  
  @media screen and (max-width: 1100px) {
    padding: 0.8rem 0.5rem;
    height: 700px;
  }
  
`

const ArtistInfo = styled.div`
  width: 100%;
  height: 70%;
  //border: 1px red solid;
  background: rgba(14,22,39,.85);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px 40px;

  .username {
    font-size: 2rem;
    color: #fff;
  }

  .slogan {
    background: linear-gradient(90deg, #12dbe4, #02fbab);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.25rem;
    text-align: center;
  }

  .describe {
    color: #b2b2b2;
    font-size: 1rem;
    text-align: center;
  }
`

const FollowersInfo = styled.div` 
  width: 100%;
  height: 12%;
  background: rgba(14,22,39,.85);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 15px 20px;
  
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    height: 18%;
  }
`

const LeftArea = styled.div` 
  width: 15%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  //border: 1px red solid;
  
  .label {
    font-size: 1rem !important;
  }
  .value{
    font-size: 1.7rem !important;
    margin-right: 10px;
  }
`


const RightArea = styled.div`
  width: 82%;
  height: 100%;
  display: flex;
  //padding: 16px;

  .followers {
    width: 100%;
    position: relative;
    min-height: 50px;
    overflow: hidden;
  !important;

    &:before {
      content: "";
      width: 100%;
      height: 64px;
      position: absolute;
      left: 0;
      background: linear-gradient(270deg, transparent 95%, #1c2b38), linear-gradient(90deg, transparent 95%, #1c2b38);
      z-index: 1;
    }

    .followers-icon {
      overflow: hidden;
    !important;
      width: 100%;
    }

    .followers-icon-inner {
      display: flex;
      -webkit-animation: scrollDown 200s alternate;
      animation: scrollDown 20s alternate;
      -webkit-animation-timing-function: linear;
      animation-timing-function: linear;

      .is-48 {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin: 0 5px;
      }
    }

    @keyframes scrollDown {
      0% {
        transform: translateX(0px);
      }
      100% {
        transform: translateX(-100%);
      }
    }

  }
`

const StyledTab = styled(Tabs)`
  width: 100%;
  user-select: none;
  margin-top: 20px;

  .ant-tabs-tab {
    font-size: 20px;
    color: #E5E8EB !important;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #94DAFF !important;

  }

  .ant-tabs-nav-wrap {
    display: flex;
    justify-content: center;!important;
  }

  .ant-tabs-nav::before {
    //display: none; !important;
    border-bottom: 1px #65727b solid;

  }

  .ant-tabs-ink-bar {
    line-height: 20px;
    background-image: linear-gradient(to right, #00EBA4, #02A6F5);
    padding: 4px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
  
  @media screen and (max-width: 1100px) {
    .ant-tabs-tab {
      font-size: 16px;
    }
  }
`


const DescriptionContainer = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 20px;
  margin: 30px 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 25px;
  flex-direction: column;
  background: linear-gradient(0deg, rgba(14,22,39,.8),rgba(36,52,84,.8)) border-box;
  
  @media screen and (max-width: 1100px) {
    padding: 10px;
  }
  
`

const ArtistDetailTab = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;


  .ant-anchor-link-title {
    font-size: 1.2em;
    color: #fff;
  }

  .ant-anchor-link-active > .ant-anchor-link-title {
    color: #00EBA4;
  }

  .ant-anchor-ink::before{
    background-color: #00EBA4;
  }
  
  
  @media screen and (max-width: 1100px) {
    justify-content: center;
  }
  
`

const TabItem = styled.div`
  max-width: calc(100% - 40px);
  width: 80%;
  height: auto;



  .item{
    width: 100%;
    //border: 1px red solid;
  }

  .title {
    font-size: 2.5rem;
    color: #fff;
  }

  .image-border{
    max-width: 100%;
    object-fit: contain;
    border-radius: 20px;
    margin: 1rem 0;
    display: block;
  }

  .content {
    color: #b2b2b2;
    font-size: 1rem;
  }

  @media screen and (max-width: 1100px) {
    width: 100%;
    max-width: calc(100% - 10px);
  }
`

const NavLinksContainer = styled.div`
  width: 20%;
  height: auto;
  align-items: start;
  display: flex;
  flex-direction: column;

  li {
    width: 100%;
    list-style: none;
    float: left;
    cursor: pointer;
    font-size: 18px;
    margin-bottom: 10px;
    border-bottom: 1px #3a5e71 solid;
    
}
  

  @media screen and (max-width: 1100px) {
    display: none;
  }

`

const MenuItem = styled.div<{activate?: boolean}>`
  color: #61dafb;
`

const UserInfo: React.FC<{ userData?:UserDetail }> = ({ userData }) => {

  // console.log(userData)
  return (
    <HeaderContainer backgroundImage={userData?.backgroundImage}>
      <ArtistInfo>
        <Avatar size={ 64 } src={userData?.avatar} />
        <div className="username">{userData?.username}</div>
        <div className="slogan">{userData?.slogan}</div>
        <p className="describe">{userData?.describe}</p>
      </ArtistInfo>
      <FollowersInfo>
        <LeftArea >
          <div className="value"> {userData?.followers.length}</div>
          <div className="label"> Followers </div>
        </LeftArea>
        <RightArea>
          <div className="followers" >
            <div className="followers-icon">
              <div className="followers-icon-inner">
                {
                  userData?.followers.map((item:string, index:number) => (
                    <img className="is-48" src={item} key={index} />
                  ))
                }
              </div>
            </div>
          </div>
        </RightArea>
      </FollowersInfo>
    </HeaderContainer>
  )
}

const ArtDetail: React.FC<{ userData?:UserDetail }> = ({ userData }) => {

  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })


  return (
    <ArtistDetailTab>
      {/*<Affix offsetTop={125}>*/}
      {/*  <NavLinksContainer id="NavLinksContainer" >*/}

      {/*    {*/}
      {/*      userData?.artDetail.map((item:any, index:number) => (*/}
      {/*        <li key={index}>*/}
      {/*          <MenuItem onClick={() => scrollToPart(item.title)}> {item.title} </MenuItem>*/}
      {/*        </li>*/}
      {/*      ))*/}
      {/*    }*/}
      {/*  </NavLinksContainer>*/}
      {/*</Affix>*/}
      <Anchor onClick={onAnchorClick} offsetTop={150} style={isMobile ? { display:'none' }  : {}}>
        {
          userData?.artDetail.map((item: any, index: number) => (
            <Link href={`#${item.title}`}  key={index} title={item.title} />
          ))
        }
      </Anchor>


      <TabItem>
        {
          userData?.artDetail.map((item:any, index:number) => (
            <section className="item" key={index} id={item.title}>
              <h2 className="title"> {item.title} </h2>
              <img className="image-border" src={item.image} />
              <p className="content"> {item.content} </p>
            </section>
          ))
        }
      </TabItem>
    </ArtistDetailTab>
  )
}

const Mint: React.FC<{ artistKit?: ArtistKit }> = ({ artistKit }) => {
  const [body, setBody] = useState<any>()

  const [kits, setKits] = useState<Map<string, any>>(new Map())

  const [style, setStyle] = useState('')

  const [show, setShow] = useState<boolean>(false)

  const { mintNFT } = useNFTMint()

  const { data: styleList } = useStyledNFTsQuery()

  useMemo(() => {
    if (!show) {
      setStyle('')
    }
  },[show])


  useEffect(() => {
    console.log(kits)
  }, [kits,body])


  const list = artistKit?.bodyList.map((body:{url: string, price: number, rarity: string}) =>({
    url: body.url,
    price: body.price,
    rarity: body.rarity
  }))

  const KIT_TYPES: Array<{name: string, list: KitProperties[], key: string}> = useMemo(() =>
    [
      {
        name: 'Hats',
        key: 'hat',
        list: artistKit?.hatList
      },
      {
        name: 'Face',
        key: 'face',
        list: artistKit?.faceList
      }
    ], [artistKit])

  return (
    <MintWrapper>
      <TopContainer>
        <BodyContent>
          <SelectableBodyList
            selectedValue= {body}
            onSelect= {v => setBody(v)}
            list= {list}
          />

          {
            body && (
              <SelectedBody>
                <img src={body.url} />
                <PriceContainer>
                  <div className="price">{body?.price} FTA</div>
                  <div className="price">Rarity: {body?.rarity}</div>
                </PriceContainer>
              </SelectedBody>
            )
          }
        </BodyContent>
        <KitContent >
          <MintTab>
            {
              KIT_TYPES.map(type => (
                <TabPane key={type.name} tab={type.name} >
                  <MintContainer>
                    <SelectableKitList
                      selectedValue={kits.get(type.key)}
                      onSelect={v => {
                        setKits(prev => {
                          const map = new Map(prev)
                          map.set(type.key, v ? v : undefined  )
                          if (!v){ map.delete(type.key)}
                          return map
                        })
                      }}
                      list={type.list}
                    />
                  </MintContainer>
                </TabPane>
              ))
            }
          </MintTab>
        </KitContent>
      </TopContainer>

      <CenterContainer>
        <SelectedList body={body} kitList={kits} />
      </CenterContainer>

      <AIContainer>
        <div className="title">
          <div>AI-GEN</div>
          <StyledSwitch>
            <Switch onChange={() => setShow(!show)} />
          </StyledSwitch>
        </div>
        <AIContent  >
          <div className={ show ? 'style' : 'hide' }>
            <SelectableNFTList
              selectedValue={style}
              onSelect={v=> setStyle(v)}
              list={styleList?.map((style: { image: any}) => style?.image)}
            />
          </div>
        </AIContent>

      </AIContainer>

      <MintButton onClick={ () => mintNFT(body, kits, style)}  >Mint</MintButton>
    </MintWrapper>
  )
}

const ArtistDetail: React.FC = () => {
  const { data: userData } = useArtistDetailQuery()

  const { data: artistKisList } = useArtistKitQuery()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [userData])

  return (
    <Wrapper>
      <ArtistDetailContainer>
        <UserInfo userData={userData} />
        <DescriptionContainer>
          <StyledTab defaultActiveKey="artDetail"  >
            <TabPane
              tab= {
                <span>
                  <SmileOutlined />
                  Art Detail
                </span>
              }
              key="artDetail"
            >

              <ArtDetail userData={userData} />
            </TabPane>

            <TabPane
              tab= {
                <span>
                  <DollarOutlined />
                  Mint
                </span>
              }
              key="mint"
            >
              <Mint artistKit={artistKisList} />
            </TabPane>

          </StyledTab>
        </DescriptionContainer>
      </ArtistDetailContainer>
    </Wrapper>
  )
}


export default ArtistDetail
