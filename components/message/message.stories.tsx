import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Message from './message'

export default {
  title: 'Example/Message',
  component: Message
} as ComponentMeta<typeof Message>

const Template: ComponentStory<typeof Message> = args => <Message {...args} />

const exampleAvatar =
  'https://www.vhv.rs/dpng/d/23-230019_biblethump-twitch-emote-png-transparent-png.png'

export const Self = Template.bind({})
Self.args = {
  isSelf: true,
  userAvatarUrl: exampleAvatar,
  text: 'self self self self self self self self self self',
  time: Date.now()
}

export const Other = Template.bind({})
Other.args = {
  isSelf: false,
  userAvatarUrl: exampleAvatar,
  text: 'other other other other other other other other other other',
  time: Date.now()
}
