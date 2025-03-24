import { Block } from 'payload';

const ContactsBlock: Block = {
  slug: 'contacts', // slug блока, который будет совпадать с blockType при рендеринге
  labels: {
    singular: 'Contacts Block',
    plural: 'Contacts Blocks',
  },
  fields: [
    {
      name: 'contacts',
      label: 'Contacts',
      type: 'relationship',
      relationTo: 'contacts', // коллекция, где хранятся контакты
      hasMany: true,
      required: true,
    },
    {
      name: 'locale',
      label: 'Locale',
      type: 'select',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Russian', value: 'ru' },
      ],
      defaultValue: 'en',
      required: true,
    },
  ],
};

export default ContactsBlock;
