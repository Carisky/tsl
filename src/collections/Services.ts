import { CollectionConfig } from 'payload';

const Services: CollectionConfig = {
  access: {
    read: () => true,
  },

  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      localized: true
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'upload',
      relationTo: 'media', // slug вашей Media-коллекции
      required: false,
    },
  ],
};

export default Services;
