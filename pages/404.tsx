import styled from 'styled-components'

const Custom404Container = styled.div`
  position: absolute;
  top: 25%;
  right: 0;
  left: 0;

  .top {
    margin-bottom: 4px;
    color: ${({ theme }) => theme.blue4};
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
    text-align: center;
  }

  .down {
    color: ${({ theme }) => theme.blue12};
    line-height: 18px;
    font-size: 14px;
    text-align: center;
  }
`

const Custom404 = () => {
  return (
    <>
      <Custom404Container>
        <div className='top'>Sorry, something went wrong.</div>
        <div className='down'>
          The link may be broken, or the page may have been removed.
        </div>
      </Custom404Container>
    </>
  )
}

export default Custom404
