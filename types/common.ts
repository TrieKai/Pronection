import { GeoPoint } from '@firebase/firestore'

export interface IFirebaseChatroom {
  create_at: number
  messages: IMessage[]
  name: string
  position: GeoPoint
  users: IUsers[]
}

export interface IMessage {
  user_id: string
  user_name: string
  text: string
  timestamp: number
}

export interface IUsers {
  user_id: string
  user_name: string
  photo_url: string
  messaging_token: string
}

export interface IMarker {
  lat: number
  lng: number
}

export interface INotification {
  title: string
  body: string
  icon: string
  click_action: string
}
