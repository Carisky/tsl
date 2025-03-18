import type { Block } from 'payload'

export const Divider: Block = {
  slug: 'divider',
  labels: {
    singular: 'Divider',
    plural: 'Dividers',
  },
  fields: [
    {
      name: 'height',
      type: 'number',
      label: 'Height (px)',
      defaultValue: 2,
      required: true,
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      defaultValue: '#000000',
    },
  ],
}
