import { CollectionConfig } from 'payload';

const ContactGroups: CollectionConfig = {
  access: {
    read: () => true, // открываем GET для всех
  },
  slug: 'contact-groups',
  labels: {
    singular: 'Contact Group',
    plural: 'Contact Groups',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
    },
  ],
};

export default ContactGroups;
