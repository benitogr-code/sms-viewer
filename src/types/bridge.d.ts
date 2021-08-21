import { api } from '../bridge'

declare global {
  // eslint-disable-next-line
  interface Window {
    Main: typeof api
  }
}
