import type { Block } from 'payload'

export const IconsList: Block = {
  slug: 'icons-list',
  interfaceName: 'IconsListBlock',
  labels: {
    singular: 'Icons List',
    plural: 'Icons Lists',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: false,
      localized: true,
    },
    {
      name: 'titleVariant',
      type: 'select',
      label: 'Title Variant',
      required: false,
      options: [
        { label: 'h2', value: 'h2' },
        { label: 'h3', value: 'h3' },
        { label: 'h4', value: 'h4' },
      ],
      defaultValue: 'h4',
    },
    {
      name: 'layoutMode',
      type: 'select',
      label: 'Layout Mode',
      options: [
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' },
      ],
      defaultValue: 'vertical',
      required: true,
    },
    {
      name: 'iconColor',
      type: 'text',
      label: 'Icon Color',
      defaultValue: '#8d004c',
      admin: {
        description: 'Hex color for icons (e.g. #8d004c)',
      },
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Color',
      defaultValue: '#8d004c',
      admin: {
        description: 'Hex color for text (e.g. #8d004c)',
      },
    },
    {
      name: 'textSize',
      type: 'number',
      label: 'Text Size (rem)',
      defaultValue: 1,
      admin: {
        description: 'Size of text in rem units',
        step: 0.1,

      },
    },
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
        {
          name: 'enableLink',
          type: 'checkbox',
          label: 'Link',
        },
        {
          name: 'linkType',
          type: 'radio',
          label: 'Link type',
          options: [
            { label: 'Internal', value: 'internal' },
            { label: 'External', value: 'external' },
          ],
          admin: { condition: (_, sibling) => sibling?.enableLink },
        },
        {
          name: 'reference',
          type: 'relationship',
          label: 'Internal Page',
          relationTo: ['pages', 'posts'],
          admin: {
            condition: (_, sibling) => sibling?.enableLink && sibling?.linkType === 'internal',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'External URL',
          admin: {
            condition: (_, sibling) => sibling?.enableLink && sibling?.linkType === 'external',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: false,
          admin: { condition: (_, sibling) => sibling?.enableLink },
        },
      ],
    },
  ],
}
