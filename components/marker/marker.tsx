/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from 'react'
import { a, useSpring } from '@react-spring/web'
import styled from 'styled-components'

interface IMarker {
  lat: number
  lng: number
}

interface ICustomMarker {
  href: string
  imageUrlList: string[]
  maxVisibleUserNumber?: number
}

const avatarSize = 48
const imageBoxSize = 30
const avatarBorder = 2

const MarkerContainer = styled(a.div)`
  position: relative;
  display: flex;
  padding: 4px;
  width: fit-content;
  transform-origin: center center;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: calc(4px + ${avatarSize / 2}px);
    width: calc(100% - ${imageBoxSize / 2 + avatarSize}px);
    height: calc(100% - 8px);
    background: #fff;
  }

  .image-box {
    display: flex;
    width: ${imageBoxSize}px;
    z-index: 1;

    img {
      width: ${avatarSize + avatarBorder * 2}px;
      height: ${avatarSize + avatarBorder * 2}px;
      border-radius: 100%;
      border: ${avatarBorder}px solid #fff;
    }
  }

  .last {
    width: ${avatarSize + avatarBorder * 2}px;
  }

  .number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${avatarSize + avatarBorder * 2}px;
    height: ${avatarSize + avatarBorder * 2}px;
    font-size: 20px;
    background: #91a0fb;
    border-radius: 100%;
    color: #fff;
    z-index: 1;
  }
`

const Marker: React.VFC<IMarker & ICustomMarker> = ({
  href,
  imageUrlList,
  maxVisibleUserNumber = 2
}) => {
  const [isHover, setIsHover] = useState<boolean>(false)
  const remainUserNum = imageUrlList.length - maxVisibleUserNumber

  const markerAnimation = useSpring({
    transform: isHover
      ? 'translate3d(-50%, -50%, 0) scale3d(1.1, 1.1, 1.1)'
      : 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)',
    config: { duration: 300 }
  })

  return (
    <a href={href}>
      <MarkerContainer
        style={markerAnimation}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {imageUrlList.map((imageUrl, i, _self) => (
          <Fragment key={i}>
            {i < maxVisibleUserNumber && (
              <div
                className={`image-box ${
                  _self.length <= maxVisibleUserNumber && i === _self.length - 1
                    ? 'last'
                    : ''
                }`}
              >
                <img src={imageUrl} alt='avatar' />
              </div>
            )}
          </Fragment>
        ))}
        {remainUserNum > 0 && <div className='number'>+{remainUserNum}</div>}
      </MarkerContainer>
    </a>
  )
}

export default Marker
