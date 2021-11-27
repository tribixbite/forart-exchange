import React from 'react'
import styled from '@emotion/styled'
import ai1 from '../../assets/images/AIGen/ai1.png'
import ai2 from '../../assets/images/AIGen/ai2.png'
import ai3 from '../../assets/images/AIGen/ai3.png'
import ai4 from '../../assets/images/AIGen/ai4.png'
import ai5 from '../../assets/images/AIGen/ai5.png'

const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  height: fit-content;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  .text {
    font-size: 18px;
    color: white;
  }

  @media screen and ( max-width: 1000px ){
    padding-top: 2rem;
    .title {
      font-weight: 550;
      font-size: 3rem;
      margin-bottom: 0;
    }
  }
`

const Title = styled.div`
  font-weight: 550;
  font-size: 46px;
  background-image: -webkit-linear-gradient(left, #00EBA4, #02A6F5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Banner = styled.div`
  width: 100%;
  height: 250px;
  background: red;
  border-radius: 8px;
`

const SampleContent = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const SampleMain = styled.div`
  
`

const EnterContent = styled.div`
  display: flex;

  .enter {
    width: 150px;
    color: #ccc;
    font-size: 18px;
    font-weight: bolder;
    text-align: right;
  }
  
  .enterData {
    color: white;
    font-size: 18px;
    font-weight: bolder;
    margin-left: 30px;
  }
`

const SampleImg = styled.div`
  margin-top: 20px;
  display: flex;

  .enter {
    width: 150px;
    color: #ccc;
    font-size: 18px;
    font-weight: bolder;
    text-align: right;
    margin-right: 30px;
  }
`

const SampleImgItem = styled.div`
  margin-right: 10px;
  
  .item {
    width: 150px;
  }
`

const AIGenContent = styled.div`
  margin-top: 40px;
  font-weight: 550;
  font-size: 46px;
  background-image: -webkit-linear-gradient(left, #00EBA4, #02A6F5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const AIGen:React.FC = () => {
  const SampleImgs = [ai1, ai2, ai3, ai4, ai5]

  return (
    <Wrapper >
      <Banner>
        1
      </Banner>
      <Title>AI-Gen</Title>
      <div className="text">wewddsadasd</div>
      <SampleContent>
        <Title>Sample</Title>
        <SampleMain>
          <EnterContent>
            <div className="enter">TEXT PROMPT</div>
            <div className="enterData">an illustration of a baby daikon radish in a tutu walking a dog</div>
          </EnterContent>
          <SampleImg>
            <div className="enter">AI-GENERATED IMAGES</div>
            <div style={{ display: 'flex' }}>
              {
                SampleImgs.map((item, index) => (
                  <SampleImgItem key={index}>
                    <img className="item" src={item} />
                  </SampleImgItem>
                ))
              }
            </div>
          </SampleImg>
        </SampleMain>
      </SampleContent>
      <AIGenContent>
        Coming soon ...
      </AIGenContent>
    </Wrapper>
  )
}

export default AIGen