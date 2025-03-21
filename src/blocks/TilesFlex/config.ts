import { Block } from 'payload';

export const TilesFlex: Block = {
  slug: 'tiles-flex',
  labels: {
    singular: 'Tiles Flex',
    plural: 'Tiles Flex',
  },
  fields: [
    {
      name: 'tiles',
      type: 'array',
      label: 'Tiles',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Text',
          localized: true,
          required: true,
        },
        {
          name: 'link',
          type: 'relationship',
          label: 'Link',
          relationTo: 'pages', // Укажите здесь нужную коллекцию
          required: false,
        },
      ],
    },
  ],
};

export default TilesFlex;
