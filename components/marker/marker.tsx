import styled from 'styled-components'

interface IMarker {
  imageUrlList: string[]
}

const maxUserNum = 2

const MarkerContainer = styled.div`
  position: relative;
  display: flex;
  padding: 4px;
  width: fit-content;

  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 22px;
    width: calc(100% - 44px);
    height: calc(100% - 8px);
    background: #fff;
    z-index: -1;
  }

  .image-box {
    display: flex;
    width: 24px;

    img {
      width: 32px;
      height: 32px;
      border-radius: 100%;
      border: 2px solid #fff;
    }
  }

  .last {
    width: 36px;
  }

  .number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: #91a0fb;
    border-radius: 100%;
    color: #fff;
  }
`

const Marker: React.VFC<IMarker> = ({ imageUrlList }) => {
  const remainUserNum = imageUrlList.length - maxUserNum

  return (
    <MarkerContainer>
      {imageUrlList.map((imageUrl, i, _self) => (
        <>
          {i < maxUserNum && (
            <div
              className={`image-box ${
                _self.length <= 2 && i === _self.length - 1 ? 'last' : ''
              }`}
              key={i}
            >
              <img src={imageUrl} alt='avatar' />
            </div>
          )}
        </>
      ))}
      {remainUserNum > 0 && <div className='number'>+{remainUserNum}</div>}
    </MarkerContainer>
  )
}

export default Marker
