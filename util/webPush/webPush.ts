import { getMessaging, getToken } from 'firebase/messaging'
// import { initializeApp } from 'firebase/app'
import localforage from 'localforage'

const FirebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token')
  },

  init: async function () {
    // initializeApp({
    //   apiKey: 'AIzaSyDT_QNz6bHBtDfVYFTeXhlgRan0zm60IYY',
    //   projectId: 'chat-around-me',
    //   messagingSenderId: '166778930744',
    //   appId: '1:166778930744:web:7a540b4e20ee22186408cd'
    // })

    try {
      if ((await this.tokenInlocalforage()) !== null) {
        return false
      }

      const messaging = getMessaging()
      await Notification.requestPermission()
      const token = await getToken(messaging)

      localforage.setItem('fcm_token', token)
      console.log('fcm_token', token)
    } catch (error) {
      console.error(error)
    }
  }
}

export default FirebaseCloudMessaging
