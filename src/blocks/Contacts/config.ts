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
      name: 'filterGroups',
      label: 'Filter Groups',
      type: 'relationship',
      relationTo: 'contact-groups', // выбираем из коллекции Contact Groups
      hasMany: true,
      required: false,
      defaultValue: [], // Гарантируем, что по умолчанию поле пустое
      admin: {
        description:
          'Выберите группы из коллекции "Contact Groups". Если поле пустое, будут показаны все контакты.',
      },
    },
  ],
};

export default ContactsBlock;
