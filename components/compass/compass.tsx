import styled from 'styled-components'

import { IMarker } from 'types/common'

const CompassContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: radial-gradient(${({ theme }) => theme.blue11}, transparent);
  border-radius: 100%;
  transform: translate3d(-50%, -50%, 0);

  .inner {
    width: 16px;
    height: 16px;
    background: ${({ theme }) => theme.blue10};
    border-radius: 100%;
    border: 2px solid ${({ theme }) => theme.white1};
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
