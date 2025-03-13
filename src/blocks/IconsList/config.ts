import type { Block } from 'payload'

export const IconsList: Block = {
  slug: 'icons-list',
  labels: {
    singular: 'Icons List',
    plural: 'Icons Lists',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'List Items',
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          options: [
            { label: 'Chevron Right', value: 'ChevronRight' },
            { label: 'Chevron Left', value: 'ChevronLeft' },
            { label: 'Info', value: 'Info' },
            { label: 'Alert', value: 'Alert' },
            { label: 'Check', value: 'Check' },
          ],
          defaultValue: 'ChevronRight',
        },
        {
          name: 'text',
          type: 'text',
          label: 'Text',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
