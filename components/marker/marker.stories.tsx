import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Marker from './marker'

export default {
  title: 'Example/Marker',
  component: Marker
} as ComponentMeta<typeof Marker>

const Template: ComponentStory<typeof Marker> = args => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: 0,
      height: 0
    }}
  >
    <Marker {...args} />
  </div>
)

const Avatar1 =
  'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png'
const Avatar2 =
  'https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635448_1280.png'
const Avatar3 =
  'https://cdn.pixabay.com/photo/2021/01/18/08/32/naruto-5927441_1280.png'
const Avatar4 =
  'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'

export const One = Template.bind({})
One.args = {
  chatroomName: 'One One One One One One One One One One',
  imageUrlList: [Avatar1],
  href: ''
}

export const Two = Template.bind({})
Two.args = {
  chatroomName: 'Two Two Two Two Two Two Two Two Two Two',
  imageUrlList: [Avatar1, Avatar2],
  href: ''
}

export const Multiple = Template.bind({})
Multiple.args = {
  chatroomName:
    'Multiple Multiple Multiple Multiple Multiple Multiple Multiple Multiple Multiple Multiple',
  imageUrlList: [Avatar1, Avatar2, Avatar3, Avatar4],
  href: ''
}
