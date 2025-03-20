// blocks/MediaBlock.ts
import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'size',
      type: 'select',
      required: true,
      defaultValue: 'medium',
      options: [
        {
          label: 'Small',
          value: 'small',
        },
        {
          label: 'Small+',
          value: 'small-plus',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Medium+',
          value: 'medium-plus',
        },
        {
          label: 'Large',
          value: 'large',
        },
      ],
    },
  ],
}
