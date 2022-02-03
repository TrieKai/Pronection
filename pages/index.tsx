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
import GoogleMap from 'components/googleMap/googleMap'
import Modal from 'components/modal'
import Marker from 'components/marker'
import Button from 'components/button'
import styled from 'styled-components'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import GetUserLocation from 'util/getUserLocation'
import { DEFAULT_POSITION } from 'assets/constant'
import { ReactComponent as AddIcon } from 'assets/icon/add.svg'

import { IFirebaseChatroom } from 'types/common'

const HomeConatiner = styled.main``

// const defaultPosition = { lat: 25.05075859996636, lng: 121.57745484744801 }

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
  background: #fff;
  border-radius: 100%;
  transform: translateX(-50%);

  svg [data-class='cls-1'] {
    fill: black;
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

  .text {
    font-size: 18px;
    line-height: 24px;
  }

  .input {
    flex-grow: 1;
    margin-right: 8px;
    padding: 0 5px;
    height: 30px;
  }
`

const Home: NextPage = () => {
  const { push } = useRouter()
  const auth = getAuth()
  const db = getFirestore()
  const [chatroomName, setChatRoomName] = useState<string>('')
  const [chatroomList, setChatroomList] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([])
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const [openChatroom, setOpenChatroom] = useState<boolean>(false)

  const go = useCallback(
    async (user: User, latitude: number, longitude: number) => {
      const doc = await addDoc(collection(db, 'chatrooms'), {
        name: chatroomName,
        create_at: Date.now(),
        users: [{ id: user.uid, photo_url: user.photoURL }],
        messages: [],
        position: new GeoPoint(latitude, longitude)
      })
      setChatRoomName('')
      push(`/chatroom/${doc.id}`)
    },
    [chatroomName, db, push]
  )

  const addChatroom = useCallback(async () => {
    if (chatroomName === '') return

    try {
      const { latitude, longitude } = await GetUserLocation()
      map?.panTo({ lat: latitude, lng: longitude })
      onAuthStateChanged(auth, user => {
        if (user) {
          go(user, latitude, longitude)
        } else {
          signInWithPopup(auth, provider)
            .then(result => {
              go(result.user, latitude, longitude)
            })
            .catch(error => {
              throw new Error(error)
            })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [chatroomName, map, auth, go])

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

  useEffect(() => {
    queryData()
  }, [queryData])

  const transitions = useTransition(openChatroom, {
    from: { transform: 'translateY(100%)' },
    enter: { transform: 'translateY(0px)' },
    leave: { transform: 'translateY(200%)' }
  })

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
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
        >
          {chatroomList.map(chatroom => {
            const data = chatroom.data() as IFirebaseChatroom
            return (
              <Marker
                lat={data.position.latitude}
                lng={data.position.longitude}
                href={`/chatroom/${chatroom.id}`}
                imageUrlList={data.users.map(item => {
                  return item.photo_url
                })}
                key={chatroom.id}
              />
            )
          })}
        </GoogleMap>
        <AddBox onClick={() => setOpenChatroom(true)}>
          <AddIcon />
        </AddBox>
        {transitions(({ transform }, item) =>
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
                <span className='text'>聊天室名稱：</span>
                <input
                  type='text'
                  className='input'
                  value={chatroomName}
                  maxLength={20}
                  onChange={e => setChatRoomName(e.target.value)}
                />
                <Button onClick={addChatroom}>確認</Button>
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
