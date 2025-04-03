import { CollectionConfig } from 'payload';

const Contacts: CollectionConfig = {
  access: {
    read: () => true, // открываем GET для всех
  },
  slug: 'contacts',
  labels: {
    singular: 'Contact',
    plural: 'Contacts',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'group',
      type: 'relationship',
      relationTo: 'contact-groups',
      hasMany: true,
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    // Новое опциональное поле для вспомогательной картинки
    {
      name: 'auxiliaryImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'laguages',
      type: 'text',
    },
    {
      name: 'tel',
      type: 'group',
      fields: [
        {
          name: 'primary',
          type: 'text',
          required: true,
        },
        {
          name: 'wew',
          type: 'text',
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      localized: true,
    },
  ],
};

export default Contacts;
