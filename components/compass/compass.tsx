import styled from 'styled-components'

import { IMarker } from 'types/common'

const CompassContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: radial-gradient(rgba(66, 132, 243, 0.6), rgba(66, 132, 243, 0));
  border-radius: 100%;
  transform: translate3d(-50%, -50%, 0);

  .inner {
    width: 16px;
    height: 16px;
    background: #4284f3;
    border-radius: 100%;
    border: 2px solid white;
  }
`

const Compass: React.VFC<IMarker> = () => {
  return (
    <CompassContainer>
      <div className='inner' />
    </CompassContainer>
  )
}

export default Compass
