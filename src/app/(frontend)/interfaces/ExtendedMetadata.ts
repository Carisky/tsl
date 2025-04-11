import { Metadata } from 'next'

interface ExtendedMetadata extends Metadata {
  other?: Record<string, string>
}

export default ExtendedMetadata
