/* eslint-disable @next/next/no-img-element */
import { Fragment, useCallback, useState } from 'react'
import Link from 'next/link'
import { a, useSpring } from '@react-spring/web'
import styled from 'styled-components'
import HeadShot from 'components/headShot/headShot'

import { IMarker } from 'types/common'

interface ICustomMarker {
  chatroomName: string
  href: string
  imageUrlList: string[]
  maxVisibleUserNumber?: number
}

const avatarSize = 44
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
    background: ${({ theme }) => theme.white1};
  }

  .image-box {
    display: flex;
    width: ${avatarSize + avatarBorder * 2}px;
    z-index: 1;
    border-radius: 100%;
    border: ${avatarBorder}px solid ${({ theme }) => theme.white1};

    img {
      border-radius: 100%;
    }
  }

  .number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${avatarSize + avatarBorder * 2}px;
    height: ${avatarSize + avatarBorder * 2}px;
    font-size: 20px;
    background: ${({ theme }) => theme.blue1};
    border-radius: 100%;
    color: ${({ theme }) => theme.white1};
    z-index: 1;
  }
`

export const InfoWindowContainer = styled.div`
  position: absolute;
  width: max-content;
  min-width: 56px;
  max-width: 112px;
  max-height: 44px;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
  }

  &::before {
    bottom: -6px;
    left: calc(50% + 8px);
    border-style: solid;
    border-width: 6px 9px 0 0;
    border-color: ${({ theme }) => theme.white6} transparent transparent
      transparent;
  }

  &::after {
    bottom: -4px;
    left: calc(50% + 9px);
    border-style: solid;
    border-width: 5px 7px 0 0;
    border-color: ${({ theme }) => theme.white1} transparent transparent
      transparent;
  }

  .inner {
    padding: 5px 7px;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.white1};
    border: 1px solid ${({ theme }) => theme.white6};
    border-radius: 12px;

    .text {
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-word;
      overflow: hidden;
      user-select: none;
    }
  }
`

type infoWindowSize = {
  width: number
  height: number
}

const Marker: React.VFC<IMarker & ICustomMarker> = ({
  chatroomName,
  href,
  imageUrlList,
  maxVisibleUserNumber = 2
}): JSX.Element => {
  const [isHover, setIsHover] = useState<boolean>(false)
  const remainUserNum = imageUrlList.length - maxVisibleUserNumber
  const [infoWindowSize, setInfoWindowSize] = useState<infoWindowSize>({
    width: 0,
    height: 0
  })

  const markerAnimation = useSpring({
    transform: isHover
      ? 'translate3d(-50%, -50%, 0) scale3d(1.1, 1.1, 1.1)'
      : 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)',
    config: { duration: 300 }
  })

  const infoWindowInnerRef = useCallback((node: HTMLDivElement | null) => {
    setInfoWindowSize({
      width: node?.clientWidth ?? 0,
      height: node?.clientHeight ?? 0
    })
  }, [])

  return (
    <Link href={href} passHref>
      <MarkerContainer
        style={markerAnimation}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <InfoWindowContainer
          style={{
            top: !!infoWindowSize.height
              ? `calc(-${infoWindowSize.height}px - 8px)`
              : 'unset',
            left: !!infoWindowSize.width
              ? `calc(50% - (${infoWindowSize.width}px / 2))`
              : 'unset'
          }}
        >
          <div ref={infoWindowInnerRef} className='inner'>
            <div className='text'>{chatroomName}</div>
          </div>
        </InfoWindowContainer>
        {imageUrlList.map((imageUrl, i) => (
          <Fragment key={i}>
            {i < maxVisibleUserNumber && (
              <div className='image-box'>
                <HeadShot
                  headShotURL={imageUrl}
                  width={avatarSize + avatarBorder * 2}
                  height={avatarSize + avatarBorder * 2}
                />
              </div>
            )}
          </Fragment>
        ))}
        {remainUserNum > 0 && <div className='number'>+{remainUserNum}</div>}
      </MarkerContainer>
    </Link>
  )
}

export default Marker
