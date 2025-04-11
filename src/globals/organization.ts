import { GlobalConfig } from 'payload';

const Organization: GlobalConfig = {
  slug: 'organization',
  label: 'Organization Info',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Organization Name',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      label: 'Website URL',
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo',
      relationTo: 'media', // ты должен иметь коллекцию media
    },
    {
      name: 'contactPoint',
      type: 'array',
      label: 'Contact Points',
      fields: [
        {
          name: 'telephone',
          type: 'text',
        },
        {
          name: 'contactType',
          type: 'text',
        },
      ],
    },
    {
      name: 'sameAs',
      type: 'array',
      label: 'Social Profiles',
      fields: [
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
};

export default Organization;
