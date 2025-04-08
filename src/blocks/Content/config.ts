import type { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  AlignFeature
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      { label: 'One Third', value: 'oneThird' },
      { label: 'Half', value: 'half' },
      { label: 'Two Thirds', value: 'twoThirds' },
      { label: 'Full', value: 'full' },
    ],
  },
  {
    name: 'textSize',
    type: 'select',
    label: 'Размер текста',
    defaultValue: 'text-base',
    options: [
      { label: 'small', value: 'text-sm' },
      { label: 'base', value: 'text-base' },
      { label: 'large', value: 'text-lg' },
      { label: 'xl', value: 'text-xl' },
    ],
    admin: {
      condition: (_, siblingData) => siblingData?.contentType === 'text',
    },
  },  
  {
    name: 'contentType',
    type: 'select',
    defaultValue: 'text',
    options: [
      { label: 'Text', value: 'text' },
      { label: 'Image', value: 'image' },
    ],
    admin: {
      description: 'Выберите тип содержимого для колонки',
    },
  },
  {
    name: 'animate',
    type: 'checkbox',
    label: 'Animate on scroll',
    defaultValue: true,
  },
  {
    name: 'maxImageSize',
    type: 'select',
    label: 'Макс. размер изображения',
    options: [
      { label: '100x100', value: '100' },
      { label: '200x200', value: '200' },
      { label: '300x300', value: '300' },
      { label: '400x400', value: '400' },
      { label: '500x500', value: '500' },
      { label: '600x600', value: '600' },
    ],
    defaultValue: '600',
    admin: {
      condition: (_, siblingData) => siblingData?.contentType === 'image',
    },
  },  
  {
    localized: true,
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
        AlignFeature()
      ],
    }),
    label: false,
    admin: {
      condition: (_, siblingData) => siblingData?.contentType === 'text',
    },
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, siblingData) => siblingData?.contentType === 'image',
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: { initCollapsed: true },
      fields: columnFields,
    },
  ],
}
