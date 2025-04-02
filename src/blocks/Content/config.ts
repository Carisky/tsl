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
