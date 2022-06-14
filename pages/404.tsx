import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'

const logoSize = 44

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.white3};

  .logo-wrapper {
    margin: 0 12px;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }

  .logo-text {
    font-size: 22px;
  }
`

const Custom404Container = styled.div`
  position: absolute;
  top: 35%;
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

const Custom404 = (): JSX.Element => {
  return (
    <>
      <Header>
        <Link href='/' passHref>
          <div className='logo-wrapper'>
            <Image
              src='/location-pin.png'
              width={logoSize}
              height={logoSize}
              alt='logo'
            />
          </div>
        </Link>
        <span className='logo-text'>Pronection</span>
      </Header>
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
