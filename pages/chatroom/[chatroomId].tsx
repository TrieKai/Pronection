import { createRef, useCallback, useEffect, useRef, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  arrayRemove,
  arrayUnion,
  doc,
  GeoPoint,
  getDoc,
  getFirestore,
  onSnapshot,
  updateDoc
} from 'firebase/firestore'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth'
import styled from 'styled-components'
import localforage from 'localforage'
import Message from 'components/message'
import MessageInputArea from 'components/messageInputArea'
import Button, { ButtonType } from 'components/button'
import Spinner from 'components/spinner'
import CountdownTimer from 'components/countdownTimer'
import Modal from 'components/modal'
import { UseAppSelector } from 'app/hooks'
import SendNotification from 'util/sendNotification'
import { FCMInit } from 'util/webPush/webPush'
import { FirebaseInit } from 'util/firebase'
import { ONE_DAY, DEFAULT_AVATAR_PATH } from 'assets/constant'
import { ReactComponent as ArrowIcon } from 'assets/icon/arrow.svg'

import { IFirebaseChatroom, IUsers } from 'types/common'

interface IChatroom {
  chatroomName: string
  logoURL: string
  originURL: string
}

const DEFAULT_CHATROOM_DATA: IFirebaseChatroom = {
  create_at: 0,
  messages: [],
  name: '',
  position: new GeoPoint(0, 0),
  users: []
}
const headerHeight = 64
const timerHeight = 36
const messageInputHeight = 56

const ChatroomHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${headerHeight}px;

  .back-icon {
    width: 40px;
    height: 40px;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;

    svg {
      width: 100%;
      height: 100%;
      transform: scaleX(-1);

      [data-class='cls-2'] {
        fill: ${({ theme }) => theme.blue4};
      }
    }
  }

  .chatroom-name {
    margin-left: 8px;
    font-size: 32px;
    font-weight: 600;
  }
`

const ChatroomTimer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${timerHeight}px;
  background: ${({ theme }) => theme.blue7};
  color: ${({ theme }) => theme.white1};
  font-size: 24px;
`

const ChatroomInner = styled.div`
  position: relative;
  padding: 16px;
  width: 100%;
  height: calc(
    100% - ${headerHeight}px - ${timerHeight}px - ${messageInputHeight}px
  );
  background: ${({ theme }) => theme.white5};
  overflow-y: auto;

  .top-bar {
    position: fixed;
    top: 100px;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 56px;
    background: ${({ theme }) => theme.blue1};
    color: ${({ theme }) => theme.white1};
    border-bottom: 1px solid ${({ theme }) => theme.blue8};
    z-index: 1;

    .button-box {
      margin-left: 8px;
    }
  }

  .spinner-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const provider = new GoogleAuthProvider()

const Chatroom = ({
  chatroomName,
  logoURL,
  originURL
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    back,
    query: { chatroomId },
    push
  } = useRouter()
  const auth = getAuth()
  const db = getFirestore()
  const firstRender = useRef<boolean>(true)
  const [uid, setUid] = useState<string | null>(null)
  const [chatroomData, setChatroomData] = useState<IFirebaseChatroom>(
    DEFAULT_CHATROOM_DATA
  )
  const messageRefs = useRef<(HTMLDivElement | null)[]>([])
  const isScrollToBottom = useRef<boolean>(false)
  const {
    geolocation: { viewportCenter }
  } = UseAppSelector(state => ({
    geolocation: state.geolocation
  }))

  const checkIsLoading = useCallback((): boolean => {
    return (
      chatroomData.create_at === DEFAULT_CHATROOM_DATA.create_at &&
      chatroomData.name === DEFAULT_CHATROOM_DATA.name
    )
  }, [chatroomData.create_at, chatroomData.name])

  const scrollToLatestMessage = useCallback((): void => {
    messageRefs.current[messageRefs.current.length - 1]?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [])

  const chatroomOnScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
      // check chatroom if scrolled to bottom
      isScrollToBottom.current =
        e.currentTarget.scrollTop ===
        e.currentTarget.scrollHeight - e.currentTarget.offsetHeight
    },
    []
  )

  const handleLogin = useCallback((): void => {
    signInWithPopup(auth, provider)
      .then(result => {
        setUid(result.user.uid)
      })
      .catch(error => {
        console.log(error)
        setUid('')
      })
  }, [auth])

  const sendNotification = useCallback(
    (comment: string): void => {
      const messagingTokenList = chatroomData.users
        .filter(user => user.user_id !== uid)
        .map(item => item.messaging_token)
      messagingTokenList.forEach(
        token =>
          !!token &&
          SendNotification(
            chatroomData.name,
            comment,
            auth.currentUser?.photoURL ?? '/location-pin.png',
            `https://pronection.herokuapp.com/chatroom/${chatroomId}`,
            token
          )
      )
    },
    [
      auth.currentUser?.photoURL,
      chatroomData.name,
      chatroomData.users,
      chatroomId,
      uid
    ]
  )

  const sendFCM = useCallback(
    async (comment: string): Promise<void> => {
      if (comment === '') return

      if (auth.currentUser && uid) {
        const messagingToken =
          (await localforage.getItem<string>('fcm_token')) ?? ''
        // sync with database, if user is exist and token is changed, then remove it
        const myself = chatroomData.users.find(user => user.user_id === uid)
        if (!!myself && myself.messaging_token !== messagingToken) {
          await updateDoc(doc(db, 'chatrooms', chatroomId as string), {
            users: arrayRemove(myself)
          })
        }

        const users: IUsers = {
          user_id: uid,
          user_name: auth.currentUser.displayName ?? '',
          photo_url: auth.currentUser.photoURL ?? '',
          messaging_token: messagingToken
        }
        await updateDoc(doc(db, 'chatrooms', chatroomId as string), {
          users: arrayUnion(users),
          messages: arrayUnion({
            user_id: uid,
            user_name: auth.currentUser.displayName,
            text: comment,
            timestamp: Date.now()
          })
        })
        sendNotification(comment)
      } else {
        handleLogin()
      }
    },
    [
      auth.currentUser,
      uid,
      chatroomData.users,
      db,
      chatroomId,
      sendNotification,
      handleLogin
    ]
  )

  const handleBack = useCallback((): void => {
    !!viewportCenter ? back() : push('/')
  }, [back, push, viewportCenter])

  useEffect(() => {
    if (chatroomId) {
      const unsubscribe = onSnapshot(
        doc(db, 'chatrooms', chatroomId as string),
        doc => {
          console.log('Current data: ', doc.data())
          const data = doc.data() as IFirebaseChatroom
          setChatroomData(data)
        }
      )

      return () => unsubscribe()
    }
  }, [chatroomId, db])

  useEffect(() => {
    messageRefs.current = Array(chatroomData.messages.length)
      .fill(null)
      .map((_, i) => {
        const messagesLength = chatroomData.messages.length
        if (firstRender.current) {
          if (messagesLength - 1 === i) {
            firstRender.current = false
            scrollToLatestMessage()
          }
        } else {
          if (
            (messagesLength - 1 === i &&
              chatroomData.messages[messagesLength - 1].user_id === uid) ||
            isScrollToBottom
          )
            scrollToLatestMessage()
        }

        return messageRefs.current[i] || createRef<HTMLDivElement>().current
      })
  }, [chatroomData.messages, uid, scrollToLatestMessage])

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUid(user.uid)
      } else {
        setUid('')
      }
    })
  }, [uid, auth])

  useEffect(() => {
    FCMInit()
  }, [])

  return (
    <>
      <Head>
        <title>{`Pronection | ${chatroomName}`}</title>
        <meta name='title' content={`Pronection | ${chatroomName}`} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={originURL} />
        <meta property='og:title' content={`Pronection | ${chatroomName}`} />
        <meta property='og:image' content={logoURL} />
        <meta property='twitter:url' content={originURL} />
        <meta
          property='twitter:title'
          content={`Pronection | ${chatroomName}`}
        />
        <meta property='twitter:image' content={logoURL} />
      </Head>
      <ChatroomHeader>
        <span className='back-icon' title='返回'>
          <ArrowIcon onClick={handleBack} />
        </span>
        <span className='chatroom-name'>{chatroomData.name}</span>
      </ChatroomHeader>
      <ChatroomTimer>
        <CountdownTimer
          totalTimeRemaining={
            chatroomData.create_at + ONE_DAY - new Date().getTime()
          }
          onEnd={handleBack}
        />
      </ChatroomTimer>
      <ChatroomInner onScroll={chatroomOnScroll}>
        {uid === '' && (
          <div className='top-bar'>
            請先登入唷！
            <div className='button-box'>
              <Button type={ButtonType.secondary} onClick={handleLogin}>
                Login
              </Button>
            </div>
          </div>
        )}
        <Modal show={checkIsLoading()} position={'center'}>
          <Spinner />
        </Modal>
        {chatroomData.messages.map((message, i) => (
          <Message
            ref={el => (messageRefs.current[i] = el)}
            isSelf={message.user_id === uid}
            userAvatarUrl={
              chatroomData.users.find(item => item.user_id === message.user_id)
                ?.photo_url ?? DEFAULT_AVATAR_PATH
            }
            userName={
              chatroomData.users.find(item => item.user_id === message.user_id)
                ?.user_name ?? ''
            }
            text={message.text}
            time={message.timestamp}
            key={i}
          />
        ))}
      </ChatroomInner>
      <MessageInputArea sendMessage={sendFCM} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<IChatroom> = async ({
  query,
  req
}) => {
  const { chatroomId } = query
  FirebaseInit()
  const docRef = doc(getFirestore(), 'chatrooms', chatroomId as string)
  const docSnap = await getDoc(docRef)
  const data = docSnap.data() as IFirebaseChatroom
  const logoURL = `https://${req.headers.host}/location-pin.png`
  const originURL = `https://${req.headers.host}${req.url}`
  const isExpired = (data?.create_at ?? 0) < new Date().getTime() - ONE_DAY
  const isError = !docSnap.exists() || isExpired

  return {
    props: { chatroomName: data.name, logoURL: logoURL, originURL },
    notFound: isError
  }
}

export default Chatroom
