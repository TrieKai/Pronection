/* eslint-disable @next/next/no-img-element */
import { Fragment } from 'react'
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

const avatarSize = 64
const imageBoxSize = 30
const avatarBorder = 4

const MarkerContainer = styled.div`
  position: relative;
  display: flex;
  padding: 4px;
  width: fit-content;
  transform: translate3d(-50%, -50%, 0);

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
  const remainUserNum = imageUrlList.length - maxVisibleUserNumber

  return (
    <a href={href}>
      <MarkerContainer>
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
