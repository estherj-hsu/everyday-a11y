import { createContext, useContext, useState, useCallback, useMemo, RefObject } from 'react'

type TocItem = { id: string; text: string; ref: RefObject<HTMLElement> }

const TocContext = createContext<{
  items: TocItem[]
  register: (item: TocItem) => void
} | null>(null)

export function TocProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<TocItem[]>([])

  const register = useCallback((item: TocItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => (i.id === item.id ? item : i))
      }
      return [...prev, item]
    })
  }, [])

  const value = useMemo(() => ({ items, register }), [items, register])

  return <TocContext.Provider value={value}>{children}</TocContext.Provider>
}

export function useToc() {
  const ctx = useContext(TocContext)
  if (!ctx) throw new Error('useToc must be used inside TocProvider')
  return ctx
}

