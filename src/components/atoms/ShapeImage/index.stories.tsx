import { ComponentMeta, ComponentStory } from '@storybook/react'
import ScaleImage from './index'

export default {
  title: 'Atoms/ScaleImage',
  argTypes: {
    shape: {
      options: ['square', 'circle'],
      control: { type: 'radio' },
      defaultValue: 'square',
      description: '画像の形',
      table: {
        type: { summary: 'circle | square' },
        defaultValue: 'square',
      },
    },
    src: {
      control: { type: 'text' },
      description: '画像URL',
      table: {
        type: { summary: 'string' },
      },
    },
    width: {
      control: { type: 'number' },
      defaultValue: 320,
      description: '画像の横幅',
      table: {
        type: { summary: 'number' },
      },
    },
    height: {
      control: { type: 'number' },
      description: '画像の縦幅',
      defaultValue: 320,
      table: {
        type: { summary: 'number' },
      },
    },
    containerWidth: {
      control: { type: 'number' },
      defaultValue: 320,
      description: '横幅',
      table: {
        type: { summary: 'number' },
      },
    },
    containerHeight: {
      control: { type: 'number' },
      description: '縦幅',
      defaultValue: 320,
      table: {
        type: { summary: 'number' },
      },
    },
    style: {
      control: { type: 'object' },
      description: 'スタイル',
      defaultValue: {
        objectFit: 'contain',
      },
      table: {
        type: { summary: 'object' },
      },
    },
  },
} as ComponentMeta<typeof ScaleImage>

const Template: ComponentStory<typeof ScaleImage> = (args) => (
  <ScaleImage {...args} />
)

export const Square = Template.bind({})
Square.args = { src: '/images/sample/1.jpg' }

export const Circle = Template.bind({})
Circle.args = { src: '/images/sample/2.jpg', shape: 'circle' }
