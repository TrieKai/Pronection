import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Message from './message'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Message',
  component: Message
} as ComponentMeta<typeof Message>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Message> = args => <Message {...args} />

export const Self = Template.bind({})
Self.args = {
  isSelf: true,
  text: 'self',
  time: Date.now()
}

export const Other = Template.bind({})
Other.args = {
  isSelf: false,
  text: 'other',
  time: Date.now()
}
