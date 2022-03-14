importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyDT_QNz6bHBtDfVYFTeXhlgRan0zm60IYY',
  projectId: 'chat-around-me',
  messagingSenderId: '166778930744',
  appId: '1:166778930744:web:7a540b4e20ee22186408cd'
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage(payload => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
