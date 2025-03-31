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
      name: 'caption',
      type: 'richText',
      localized:true,
      required: false,
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
    {
      name: 'imageAlignment',
      type: 'select',
      required: false,
      defaultValue: 'center',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'captionPosition',
      type: 'select',
      required: false,
      defaultValue: 'bottom',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
        {
          label: 'Bottom',
          value: 'bottom',
        },
        {
          label: 'Top',
          value: 'top',
        },
      ],
    },
  ],
}
