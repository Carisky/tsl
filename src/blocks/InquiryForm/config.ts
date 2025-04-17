// src/payload/blocks/InquiryForm.block.ts
import type { Block } from 'payload'

export const InquiryFormBlock: Block = {
  slug: 'inquiryForm',
  labels: {
    singular: 'Inquiry Form',
    plural: 'Inquiry Forms',
  },
  // нет полей: блок полностью статичен, данные берутся из API
  fields: [],
}
