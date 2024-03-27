'use client'

import { ReactNode, createContext, useContext } from "react"

const TagContext = createContext<Set<string> | null>(null)

export function TagProvider(props: { children: ReactNode; tags: string[]}) {
    return <TagContext.Provider value={new Set(props?.tags)}>
        {props?.children}
    </TagContext.Provider>
}

export function useTag() {
    const context = useContext(TagContext)
    if (!context) {
        throw Error('useTag must used under TagProvider!.')
    }
    return context
}