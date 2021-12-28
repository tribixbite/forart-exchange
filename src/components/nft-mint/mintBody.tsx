import React from 'react'
import { ImageBorder, StyledImage, SwiperList } from '../../pages/coNft/artistMint.style'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { Navigation } from 'swiper'
import { Checkbox } from 'antd'


export const SelectableBodyItem: React.FC<{ src: any, checked?: boolean, onSelect:(_?: string) => void}> = ({
  src,
  checked,
  onSelect
}) => {

  const SelectBtn: React.FC = () => {
    return (
      <div style={{
        position:'relative',
        bottom:'100px',
        left:'10px',
      }}
      >
        <Checkbox checked={checked} />
      </div>
    )
  }

  return (
    <ImageBorder
      onClick={() => onSelect(!checked ? src : undefined)}
    >
      <StyledImage
        width={100}
        height={100}
        src={src.url}
        preview={false}
        style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '10px', display:'flex', justifyContent:'center' }}
      />
      {/*<SelectBtn />*/}
    </ImageBorder>
  )
}

export const SelectableBodyList: React.FC<{selectedValue?: any, onSelect: (_?: string) => void, list?: [{url:string, price:number, rarity:string}]}> =({
  selectedValue,
  onSelect,
  list
}) => {

  return (
    <SwiperList>
      <Swiper
        modules={[Navigation]}
        slidesPerView={5}
        // navigation
        spaceBetween={10}
        direction="vertical"
      >
        {
          list?.map((item,key)=>(
            <SwiperSlide key={key} >
              <SelectableBodyItem src={item} onSelect={onSelect} checked={selectedValue?.url === item?.url} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </SwiperList>
  )
}