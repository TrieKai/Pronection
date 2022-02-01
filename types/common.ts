import { GeoPoint } from '@firebase/firestore'

export interface IMessage {
  user_id: string
  user_name: string
  text: string
  timestamp: number
}

export interface IFirebaseChatroom {
  create_at: number
  messages: IMessage[]
  name: string
  position: GeoPoint
  users: {
    id: string
    photo_url: string
  }[]
}
