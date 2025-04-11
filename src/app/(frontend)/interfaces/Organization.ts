import ContactPoint from './ContactPoint'
import SameAsItem from './SameAsItem'

interface Organization {
  name: string
  url: string
  logo?: { url: string }
  sameAs?: SameAsItem[]
  contactPoint?: ContactPoint[]
}

export default Organization
