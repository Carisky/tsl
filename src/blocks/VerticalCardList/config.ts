import { Block } from 'payload';

const VerticalCardList: Block = {
  slug: 'verticalCardList',
  labels: {
    singular: 'Vertical Card List',
    plural: 'Vertical Card Lists',
  },
  fields: [
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      required: true,
      fields: [
        {
          name: 'Images',
          type: 'array',
          label: 'Left Images',
          required: true,
          minRows: 1,
          maxRows: 2,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          localized: true,
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          localized: true,
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'link',
          type: 'group',
          label: 'Link',
          fields: [
            {
              name: 'type',
              type: 'radio',
              label: 'Link Type',
              defaultValue: 'internal',
              options: [
                {
                  label: 'Internal',
                  value: 'internal',
                },
                {
                  label: 'External',
                  value: 'external',
                },
              ],
              required: true,
            },
            {
              name: 'reference',
              type: 'relationship',
              label: 'Document to link to',
              relationTo: ['pages', 'posts'],
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'internal',
              },
            },
            {
              name: 'url',
              type: 'text',
              label: 'External URL',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'external',
              },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in new tab',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
};

export default VerticalCardList;
