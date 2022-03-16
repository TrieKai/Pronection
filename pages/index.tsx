import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  getFirestore,
  collection,
  addDoc,
  GeoPoint,
  query,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore'
import { a, useTransition } from '@react-spring/web'
import styled from 'styled-components'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import localforage from 'localforage'
import { UseAppDispatch, UseAppSelector } from 'app/hooks'
import GoogleMap from 'components/googleMap/googleMap'
import Modal from 'components/modal'
import Marker from 'components/marker'
import Button, { ButtonType } from 'components/button'
import Spinner from 'components/spinner'
import GetUserLocation from 'util/getCurrentPosition'
import { DEFAULT_POSITION } from 'assets/constant'
import { ReactComponent as AddIcon } from 'assets/icon/add.svg'

import { IFirebaseChatroom } from 'types/common'
import { UpdateGeolocation } from 'features/geolocation'

const HomeConatiner = styled.main``

const provider = new GoogleAuthProvider()

const AddBox = styled.span`
  position: absolute;
  bottom: 12px;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: #6777e2;
  border-radius: 100%;
  transform: translateX(-50%);
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  cursor: pointer;

  &:hover {
    background: #5668df;
  }

  svg [data-class='cls-1'] {
    fill: white;
  }
`

const CreateRoomContainer = styled(a.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  height: 200px;
  background: #fff;
  border-radius: 20px 20px 0 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  .text {
    font-size: 18px;
    line-height: 24px;
  }

  .input-box {
    flex-grow: 1;
    margin: 0 8px;

    @media screen and (max-width: 768px) {
      flex-grow: unset;
      margin: 12px 0 0 0;
      width: 100%;
    }

    .input {
      padding: 0 5px;
      width: 100%;
      height: 30px;
    }
  }

  .button-box {
    @media screen and (max-width: 768px) {
      margin-top: 24px;
      width: 100%;
    }
  }
`

const Home: NextPage = () => {
  const { query: routerQuery, push } = useRouter()
  const { lat: urlLat, lng: urlLng } = routerQuery
  const auth = getAuth()
  const db = getFirestore()
  const [chatroomName, setChatRoomName] = useState<string>('')
  const [chatroomList, setChatroomList] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([])
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [openChatroom, setOpenChatroom] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = UseAppDispatch()
  const { position } = UseAppSelector(state => state.geolocation)

  const goToChatroom = useCallback(
    async (user: User, latitude: number, longitude: number) => {
      const data: IFirebaseChatroom = {
        name: chatroomName,
        create_at: Date.now(),
        users: [
          {
            user_id: user.uid,
            user_name: user.displayName ?? '',
            photo_url: user.photoURL ?? '',
            messaging_token: (await localforage.getItem('fcm_token')) ?? ''
          }
        ],
        messages: [],
        position: new GeoPoint(latitude, longitude)
      }
      const doc = await addDoc(collection(db, 'chatrooms'), data)
      setChatRoomName('')
      push(`/chatroom/${doc.id}`)
    },
    [chatroomName, db, push]
  )

  const addChatroom = useCallback(async () => {
    if (chatroomName === '' || !position?.lat || !position.lng) return

    try {
      onAuthStateChanged(auth, user => {
        if (user) {
          goToChatroom(user, position.lat, position.lng)
        } else {
          signInWithPopup(auth, provider)
            .then(result => {
              goToChatroom(result.user, position.lat, position.lng)
            })
            .catch(error => {
              throw new Error(error)
            })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [chatroomName, auth, goToChatroom, position?.lat, position?.lng])

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') addChatroom()
  }

  const inputOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setChatRoomName(e.target.value)
    },
    []
  )

  const openCreateRoom = useCallback(async () => {
    const handleMap = (lat: number, lng: number) => {
      map?.panTo({ lat, lng })
      setOpenChatroom(true)
    }

    setLoading(true)
    if (position?.lat && position?.lng) {
      handleMap(position.lat, position.lng)
    } else {
      try {
        const { latitude, longitude } = await GetUserLocation()
        dispatch(
          UpdateGeolocation({
            lat: latitude,
            lng: longitude
          })
        )
        handleMap(latitude, longitude)
      } catch (error) {
        console.log(error)
      }
    }
    setLoading(false)
  }, [dispatch, map, position?.lat, position?.lng])

  const queryData = useCallback(async () => {
    // const NE = new GeoPoint(
    //   defaultPosition.lat + 0.001,
    //   defaultPosition.lng + 0.001
    // )

    // const SW = new GeoPoint(
    //   defaultPosition.lat - 0.001,
    //   defaultPosition.lng - 0.001
    // )

    // const q = query(
    //   collection(db, 'chatrooms'),
    //   where('position', '<=', NE),
    //   where('position', '>=', SW)
    // )
    const q = query(collection(db, 'chatrooms'))
    const querySnapshot = await getDocs(q)
    console.log(querySnapshot.docs)
    setChatroomList(querySnapshot.docs)
  }, [db])

  const createRoomTransitions = useTransition(openChatroom, {
    from: { transform: 'translateY(100%)' },
    enter: { transform: 'translateY(0px)' },
    leave: { transform: 'translateY(200%)' }
  })

  const mapOnChange = () => {
    const currLat = map?.getCenter().lat()
    const currLng = map?.getCenter().lng()
    if (!!currLat && !!currLng) push({ query: { lat: currLat, lng: currLng } })
  }

  useEffect(() => {
    queryData()
  }, [queryData])

  useEffect(() => {
    if (!!map && !!urlLat && !!urlLng)
      map?.panTo({ lat: Number(urlLat), lng: Number(urlLng) })
  }, [urlLat, urlLng, map])

  return (
    <>
      <Head>
        <title>Pronection</title>
        <meta name='description' content='Chat with people nearby' />
        <link rel='icon' href='/location-pin.png' />
      </Head>
      <HomeConatiner>
        <GoogleMap
          defaultCenter={DEFAULT_POSITION}
          defaultZoom={12}
          style={{ height: '100%' }}
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
          }}
          setMap={setMap}
          onChange={mapOnChange}
        >
          {chatroomList
            .sort((prev, next) => {
              const prevData = prev.data() as IFirebaseChatroom
              const nextData = next.data() as IFirebaseChatroom
              return nextData.position.latitude - prevData.position.latitude
            })
            .map(chatroom => {
              const data = chatroom.data() as IFirebaseChatroom
              return (
                <Marker
                  lat={data.position.latitude}
                  lng={data.position.longitude}
                  chatroomName={data.name}
                  href={`/chatroom/${chatroom.id}`}
                  imageUrlList={data.users.map(item => {
                    return item.photo_url
                  })}
                  key={chatroom.id}
                />
              )
            })}
        </GoogleMap>
        <AddBox onClick={openCreateRoom}>
          <AddIcon />
        </AddBox>
        <Modal show={loading} position={'center'}>
          <Spinner />
        </Modal>
        {createRoomTransitions(({ transform }, item) =>
          item ? (
            <Modal
              show={openChatroom}
              onClose={() => setOpenChatroom(false)}
              position={'flex-end'}
            >
              <CreateRoomContainer
                onClick={e => e.stopPropagation()}
                style={{ transform: transform }}
              >
                <span className='text'>聊天室名稱</span>
                <div className='input-box'>
                  <input
                    type='text'
                    className='input'
                    value={chatroomName}
                    maxLength={20}
                    onChange={inputOnChange}
                    onKeyPress={handleOnKeyPress}
                  />
                </div>
                <div className='button-box'>
                  <Button type={ButtonType.primary} onClick={addChatroom}>
                    確認
                  </Button>
                </div>
              </CreateRoomContainer>
            </Modal>
          ) : (
            <></>
          )
        )}
      </HomeConatiner>
    </>
  )
}

export default Home
