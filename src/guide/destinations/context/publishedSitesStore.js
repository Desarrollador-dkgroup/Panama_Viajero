import { createContext, useContext } from 'react'

export const PublishedSitesContext = createContext({
  sites: [],
  sitesById: {},
  loading: true,
  error: '',
})

export function usePublishedSites() {
  return useContext(PublishedSitesContext)
}
