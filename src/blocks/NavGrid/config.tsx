import type { Block } from 'payload';

const NavGrid: Block = {
  slug: 'navGrid',
  labels: {
    singular: 'Nav Grid',
    plural: 'Nav Grids',
  },
  fields: [
    {
      name: 'gridItems',
      type: 'array',
      label: 'Элементы сетки',
      minRows: 1,
      maxRows: 4, // можно добавить до 4 элементов (2x2)
      fields: [
        {
          name: 'image',
          type: 'upload', // оставляем тип upload для загрузки картинок
          label: 'Изображение',
          relationTo: 'media', // предполагается, что у вас есть коллекция media
        },
        {
          name: 'text',
          type: 'richText',
          label: 'Текст',
          localized: true,
        },
        {
          name: 'link',
          type: 'group',
          label: 'Ссылка',
          fields: [
            {
              name: 'type',
              type: 'select',
              label: 'Тип ссылки',
              options: [
                { label: 'Internal', value: 'internal' },
                { label: 'External', value: 'external' },
              ],
            },
            {
              name: 'externalUrl',
              type: 'text',
              label: 'Внешняя ссылка',
              admin: {
                condition: (_: any, siblingData: any) =>
                  siblingData?.type === 'external',
              },
            },
            {
              name: 'internalPage',
              type: 'relationship',
              label: 'Внутренняя страница',
              relationTo: 'pages', // предполагается, что у вас есть коллекция страниц
              admin: {
                condition: (_: any, siblingData: any) =>
                  siblingData?.type === 'internal',
              },
            },
          ],
        },
      ],
    },
  ],
};

export default NavGrid;
