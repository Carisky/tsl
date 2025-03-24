import { CollectionConfig } from 'payload';

const Contacts: CollectionConfig = {
  slug: 'contacts',
  labels: {
    singular: 'Contact',
    plural: 'Contacts',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    // Поле "group" теперь - relationship к коллекции contact-groups
    {
        name: 'group',
        type: 'relationship',
        relationTo: 'contact-groups' as any,
        required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
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
