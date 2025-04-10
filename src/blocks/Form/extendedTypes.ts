// types/ExtendedForm.ts
import type { Form as PayloadForm } from '@payloadcms/plugin-form-builder/types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export interface ExtendedForm extends PayloadForm {
  enableIntro?: boolean
  introContent?: SerializedEditorState
}
