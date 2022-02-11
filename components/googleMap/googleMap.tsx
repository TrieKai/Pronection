import { useCallback, useRef } from 'react'
import GoogleMapReact, { Props } from 'google-map-react'
import styled from 'styled-components'
import GetUserLocation from 'util/getUserLocation'
import { GoogleMapLayerStyles } from './asset'
import { ReactComponent as GPSFixedIcon } from 'assets/icon/gps-fixed.svg'
import { ReactComponent as AddIcon } from 'assets/icon/add.svg'
import { ReactComponent as MinusIcon } from 'assets/icon/minus.svg'

interface IGoogleMap extends Props {
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map<Element> | null>>
}

const MapContainer = styled.main`
  .gmnoprint a,
  .gmnoprint span,
  .gm-style-cc {
    display: none;
  }
`

const ControlContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 56px;
  z-index: 1;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 12px;
    width: 32px;
    height: 32px;
    background: #fff;
    border-radius: 100%;
    cursor: pointer;

    svg [data-class='cls-1'] {
      fill: #314146;
    }

    @media not screen and (hover: none) {
      &:hover svg [data-class='cls-1'] {
        fill: rgba(40, 70, 80, 0.6);
      }
    }

    @media screen and (hover: none) {
      &:active svg [data-class='cls-1'] {
        fill: rgba(40, 70, 80, 0.6);
      }
    }
  }
`

const GoogleMap: React.FC<IGoogleMap> = (props): JSX.Element => {
  const { options, style, setMap, children } = props
  const mapRef = useRef<google.maps.Map | null>(null)

  const onLoaded = useCallback(
    ({ map: googleMap }) => {
      setMap(googleMap)
      mapRef.current = googleMap
    },
    [setMap]
  )

  const ZoomOut = useCallback(() => {
    mapRef.current?.setZoom(mapRef.current.getZoom() - 1)
  }, [])

  const ZoomIn = useCallback(() => {
    mapRef.current?.setZoom(mapRef.current.getZoom() + 1)
  }, [])

  const Locating = useCallback(() => {
    GetUserLocation().then(position => {
      mapRef.current?.panTo({ lat: position.latitude, lng: position.longitude })
      mapRef.current?.setZoom(14)
    })
  }, [])

  return (
    <MapContainer>
      <ControlContainer>
        <span onClick={Locating}>
          <GPSFixedIcon />
        </span>
        <span onClick={ZoomIn}>
          <AddIcon />
        </span>
        <span onClick={ZoomOut}>
          <MinusIcon />
        </span>
      </ControlContainer>
      <GoogleMapReact
        defaultZoom={15}
        style={style}
        options={{
          disableDefaultUI: true,
          styles: GoogleMapLayerStyles,
          ...options
        }}
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
        }}
        onGoogleApiLoaded={onLoaded}
        yesIWantToUseGoogleMapApiInternals
        {...props}
      >
        {children}
      </GoogleMapReact>
    </MapContainer>
  )
}

export default GoogleMap
