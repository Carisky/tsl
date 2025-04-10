import type { Block } from 'payload'

export const ModalForm: Block = {
  slug: 'modalForm',
  labels: {
    singular: 'Modal Form',
    plural: 'Modal Forms',
  },
  fields: [
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      defaultValue: 'Open Form',
      label: 'Button Text',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Form to Display',
    },
  ],
}
