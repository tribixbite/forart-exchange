import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 20px 0;
  width: 100%;
`
export const Title = styled.div`
  font-size: 2.5em;
  color: #ffffff;
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 6px;
    height: 5px;
    background-color: transparent;
  }
`

const MintItems = styled.div`
  margin: 10px;
  min-width: 135px;
  min-height: 200px;
  width: 200px;
  height: 200px;
  background: transparent;
  border-radius: 10px;
  
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  &:last-child {
    margin-right: auto;
  }
`

const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
`

const PreviewImages = styled.div`
  position: absolute;
  width:100%;
  height: 100%;
  background: transparent;
  border-radius: 10px;

  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
`

export const SelectedList: React.FC<{kitList?: Map<string, any>, body: any}> = ({ kitList, body }) => {

  useEffect(()=> {
    // console.log(Array.from(kitList?.entries() ?? []))
  },[kitList])

  return (
    <Wrapper>
      <Container>

        <MintItems>
          {
            body?.url && <img src={body?.url} />
          }
        </MintItems>

        {
          Array.from(kitList?.entries() ?? []).map(([key, value]) => (
            <MintItems  key={key}>
              <img className="image" src={value.url} />
            </MintItems>
          ))
        }
      </Container>
    </Wrapper>
  )
}

export const NFTPreview: React.FC<{kitList?: Map<string, any>, body: any}> = ({ kitList, body }) => {

  const [background, setBackground] = useState<any>()
  
  const filterBackground = (array: any) => {
    return array[0] !== 'background'
  }

  // let background = null

  useEffect(()=> {
    setBackground (kitList?.get('background'))
    console.log(Array.from(kitList?.entries() ?? []).filter(filterBackground))
  },[kitList])

  return (
    <Wrapper>
      <PreviewContainer>
        <PreviewImages>
          {
            background?.url && <img src={background?.url} />
          }
        </PreviewImages>
        <PreviewImages>
          {
            body?.url && <img src={body?.url} />
          }
        </PreviewImages>

        {
          Array.from(kitList?.entries() ?? []).filter(filterBackground).map(([key, value]) => (
            <PreviewImages  key={key}>
              <img className="image" src={value.url} />
            </PreviewImages>
          ))
        }
      </PreviewContainer>
    </Wrapper>
  )
}
