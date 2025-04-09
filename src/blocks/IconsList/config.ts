import type { Block } from 'payload'

export const IconsList: Block = {
  slug: 'icons-list',
  interfaceName:"IconsListBlock",
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
          admin: {
            condition: (_, siblingData) => siblingData?.enableLink === true,
          },
        },
        {
          name: 'reference',
          type: 'relationship',
          label: 'Internal Page',
          relationTo: ['pages', 'posts'],
          admin: {
            condition: (_, siblingData) =>
              siblingData?.enableLink === true && siblingData?.linkType === 'internal',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'External URL',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.enableLink === true && siblingData?.linkType === 'external',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: false,
          admin: {
            condition: (_, siblingData) => siblingData?.enableLink === true,
          },
        },
      ],
    },
    
  ],

}
