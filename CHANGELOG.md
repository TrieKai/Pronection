# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/TrieKai/chat-around/compare/v1.0.0...v1.1.0) (2022-03-26)

### Features

- **chatroom:** add spinner in chatroom when fetching data ([6f97fc7](https://github.com/TrieKai/chat-around/commit/6f97fc7f039b30c0ed2b2945f567093ae286135a))
- **countdowntimer:** add countdownTimer of component ([fe086a1](https://github.com/TrieKai/chat-around/commit/fe086a1ccab80b3ea69830d54d31a21fefeb3f34))
- **error_page:** add custom 404 page ([26caa5a](https://github.com/TrieKai/chat-around/commit/26caa5a22bb05bc19a1c8fd1a2872b8ad325a3e7))
- **errorpage:** hadle error about the chatroom does not exist ([3b435da](https://github.com/TrieKai/chat-around/commit/3b435daaafec52b94d3da8572cad535f8496ddd3))
- **expired_rules:** add a one-day expiration rule ([2586fe8](https://github.com/TrieKai/chat-around/commit/2586fe8ca186dbbc5ec079f0cd24811336ccefbc))
- **fcm:** add web push notification of FCM ([5b801c8](https://github.com/TrieKai/chat-around/commit/5b801c8d81d75ad096851eb6966a3190a56a9f2f))
- **message:** set default avatar photo ([f0fbc2c](https://github.com/TrieKai/chat-around/commit/f0fbc2c113b9c07b6168b0415595165e342c6fdc))
- **notification:** add link ([4d2f999](https://github.com/TrieKai/chat-around/commit/4d2f999db7ac012d3a96cde5337438afa8fe45e5))
- **notification:** custom notification ([6bc1606](https://github.com/TrieKai/chat-around/commit/6bc160697f5e40d58e758c3618f83c6a1d9a040b))
- **notification:** duplicate notification and move FCM init to chatroom ([c9f1a05](https://github.com/TrieKai/chat-around/commit/c9f1a0528a0adff681045900dabbd887eb127b42))
- **pwa:** add pwa by next-pwa and add some icons ([4343924](https://github.com/TrieKai/chat-around/commit/43439245aa734d920d48bbdd4cf079fa0abcd979))
- **redux:** add redux of geolocation ([844695e](https://github.com/TrieKai/chat-around/commit/844695e2b9dff2a4be53d124b37582d780749977))
- **url:** push lat and lng into url ([024c6a7](https://github.com/TrieKai/chat-around/commit/024c6a7ea8f0e5cbfe1515a4d5d700baf4e1e608))

### Bug Fixes

- **chatroom:** getFirestore error on server side ([7aae61f](https://github.com/TrieKai/chat-around/commit/7aae61fc1f754bc44833e080b9a0da8bfdf4e05f))
- **compass & modal:** eSLint of compass & modal component ([2195ca0](https://github.com/TrieKai/chat-around/commit/2195ca07eb5d5e733bf9b423c520309279d6d757))
- **countdowntimer:** show '--:--:--' when timer is ended ([4ac5832](https://github.com/TrieKai/chat-around/commit/4ac5832fe78026cf76c22e1614ffda2248cf903f))
- **countdowntimer:** wrong trigger timing about onEnd() ([3dff5c9](https://github.com/TrieKai/chat-around/commit/3dff5c9a65cb7f7b7eb4ce0b34de6da9ff0208a0))
- **FireStore:** sync with FireStore when token updated ([8969dfb](https://github.com/TrieKai/chat-around/commit/8969dfbc69a252bab734e86c26011fa833b4bd89))
- **home:** create chatroom double times ([70dd302](https://github.com/TrieKai/chat-around/commit/70dd302ff328821d8608cd55b77becd3728d47ac))
- **index:** went wrong with create chatroom ([7e888c5](https://github.com/TrieKai/chat-around/commit/7e888c5354ecd1bc96344cd595bc99b6fc5980f2))
- **spinner:** wrong args of spinner storybook ([e3dd238](https://github.com/TrieKai/chat-around/commit/e3dd23887899656f4824bab9534b4e8b2609d4d7))

## 1.0.0 (2022-02-20)

### Features

- **button:** add button component ([05c66b9](https://github.com/TrieKai/chat-around/commit/05c66b9924404bee9f34612b3e73888975e75d19))
- **chatroom:** add chatroom page & messageInputArea component and modify message component ([dce2121](https://github.com/TrieKai/chat-around/commit/dce21216fbc46bc3a867f539a382d5411fe3dc26))
- **chatroom:** add login top bar & modify button component ([cf26042](https://github.com/TrieKai/chat-around/commit/cf26042698734dc406d4952855851e76b2703847))
- **chatroom:** modify chatroom auth flow ([1447b41](https://github.com/TrieKai/chat-around/commit/1447b416829849cf195eab5aa08daec4e598ab68))
- **compass:** add compass component on map ([353497e](https://github.com/TrieKai/chat-around/commit/353497e644e1848812b27810a4cb9659c5d3fe60))
- **firebase:** add new field of user name ([55f2d1c](https://github.com/TrieKai/chat-around/commit/55f2d1c2551475ed027d070d33a49d867298d71e))
- **googleMap:** add googleMap component ([3f69a42](https://github.com/TrieKai/chat-around/commit/3f69a42a7df1226ad8c7ec04d202bfbd940b81f8))
- **homePage:** add home page ([06139b5](https://github.com/TrieKai/chat-around/commit/06139b54b612570adf761233f441463c6d8f23ff))
- **marker:** add marker component ([4558d9b](https://github.com/TrieKai/chat-around/commit/4558d9b31949fc0b848ad7bee8f8aef8f1da2a1b))
- **markerInfoWindow:** add infoWindow of marker ([51af9b0](https://github.com/TrieKai/chat-around/commit/51af9b0c0687ec0f8e52e53e96c139dfc391f594))
- **message:** add username info ([0d3a9a4](https://github.com/TrieKai/chat-around/commit/0d3a9a43c52bd60d75d7da5c3886b75cba59ad79))
- **modal:** transition animation of modal background ([035be9c](https://github.com/TrieKai/chat-around/commit/035be9cb7ddd5ed3fa641bbf387d656070f7f85f))
- **spinner:** add loading animation ([92d61b7](https://github.com/TrieKai/chat-around/commit/92d61b7659e6020884107687562ef9f53f3531d4))
- **storybook:** add dark theme ([61785bf](https://github.com/TrieKai/chat-around/commit/61785bf996411699956412ae51d175b1d89fe9ea))
- **util:** add util of get user location ([9e9b763](https://github.com/TrieKai/chat-around/commit/9e9b76311c8c90934b188468fc233dfc1398054f))

### Bug Fixes

- **chatroom:** scroll to bottom when get new message ([55cdd05](https://github.com/TrieKai/chat-around/commit/55cdd055482d02b2a6b912061be8509c0a489c30))
- **firebase:** auth popup window be blocked on Safari ([219973e](https://github.com/TrieKai/chat-around/commit/219973eaa71576ddeaf67fc5792542399aec65ff))
- **map:** control buttons style when click on mobile ([d0468c4](https://github.com/TrieKai/chat-around/commit/d0468c4387be0c7765b6d7d21ea8c8bab0fe9567))
- **marker:** rearrange the order of markers determined by latitude ([32ef7da](https://github.com/TrieKai/chat-around/commit/32ef7dacba30cd375eb64680eacadb94b8562796))
- **message & marker:** send message when user click 'Enter' & modify marker size from 64px to 48px ([9802231](https://github.com/TrieKai/chat-around/commit/9802231a18e4767781332b982f58296b15f6113c))
- **message & marker:** wrong style on safari ([6d6c6c8](https://github.com/TrieKai/chat-around/commit/6d6c6c8ca83e1c832208b2645c704183c3ae8466))
- **message:** modify message component & storybook ([e3668cf](https://github.com/TrieKai/chat-around/commit/e3668cfd2b8c51b73098d842e40e47c0a938aca5))
- **storybook:** svg ReactComponent ([1c14d0a](https://github.com/TrieKai/chat-around/commit/1c14d0aecfa4612ae8f69f7e3c3750ba9c6c6469))
