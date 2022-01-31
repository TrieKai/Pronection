import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TypingArea from './messageInputArea'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/MessageInputArea',
  component: TypingArea
} as ComponentMeta<typeof TypingArea>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TypingArea> = args => (
  <TypingArea {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}
