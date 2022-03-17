import { createRef, useCallback, useEffect, useRef, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import {
  arrayRemove,
  arrayUnion,
  doc,
  GeoPoint,
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
import SendNotification from 'util/sendNotification'
import FirebaseCloudMessaging from 'util/webPush/webPush'
import { ReactComponent as ArrowIcon } from 'assets/icon/arrow.svg'

import { IFirebaseChatroom, IUsers } from 'types/common'

interface IChatroom {
  hostname: string | null
}

const DEFAULT_CHATROOM_DATA: IFirebaseChatroom = {
  create_at: 0,
  messages: [],
  name: '',
  position: new GeoPoint(0, 0),
  users: []
}

const ChatroomContainer = styled.div`
  position: relative;
  padding: 16px;
  width: 100%;
  height: calc(100% - 64px - 56px);
  background: #f5f8f9;
  overflow-y: auto;

  .top-bar {
    position: fixed;
    top: 64px;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 56px;
    background: #91a0fb;
    color: #fff;
    border-bottom: 1px solid #8898ff;

    .button-box {
      margin-left: 8px;
    }
  }
`

const ChatroomHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;

  .back-icon {
    width: 40px;
    height: 40px;
    cursor: pointer;

    svg {
      width: 100%;
      height: 100%;
      transform: scaleX(-1);

      [data-class='cls-2'] {
        fill: #314146;
      }
    }
  }

  .chatroom-name {
    margin-left: 8px;
    font-size: 32px;
    font-weight: 600;
  }
`

const provider = new GoogleAuthProvider()

const Chatroom = ({
  hostname
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
  const [comment, setComment] = useState<string>('')
  const [chatroomData, setChatroomData] = useState<IFirebaseChatroom>(
    DEFAULT_CHATROOM_DATA
  )
  const messageRefs = useRef<(HTMLDivElement | null)[]>([])
  const isScrollToBottom = useRef<boolean>(false)

  const scrollToLatestMessage = useCallback((): void => {
    messageRefs.current[messageRefs.current.length - 1]?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [])

  const chatroomOnScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
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

  const sendMessage = useCallback(async (): Promise<void> => {
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
      setComment('')
    } else {
      handleLogin()
    }
  }, [
    comment,
    auth.currentUser,
    uid,
    chatroomData.users,
    db,
    chatroomId,
    sendNotification,
    handleLogin
  ])

  const handleBack = useCallback(() => {
    if (!hostname) {
      push('/')
      return
    }
    const regex = new RegExp(hostname)
    regex.test(document.referrer) ? back() : push('/')
  }, [back, hostname, push])

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
  }, [db, chatroomId])

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
    FirebaseCloudMessaging.init()
  }, [])

  return (
    <>
      {/* TODO: Custom head title */}
      <ChatroomHeader>
        <span className='back-icon'>
          <ArrowIcon onClick={handleBack} />
        </span>
        <span className='chatroom-name'>{chatroomData.name}</span>
      </ChatroomHeader>
      <ChatroomContainer onScroll={chatroomOnScroll}>
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
        {chatroomData.messages.map((message, i) => (
          <Message
            ref={el => (messageRefs.current[i] = el)}
            isSelf={message.user_id === uid}
            userAvatarUrl={
              chatroomData.users.find(item => item.user_id === message.user_id)
                ?.photo_url ?? ''
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
      </ChatroomContainer>
      <MessageInputArea
        comment={comment}
        setComment={setComment}
        sendMessage={sendMessage}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<IChatroom> = async ({
  req
}) => ({
  props: { hostname: req.headers.host || null }
})

export default Chatroom
