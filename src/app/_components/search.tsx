'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

function Search() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const [searchText, setSearchText] = useState(() => {
        if (!searchParams.has('search')) {
            return ''
        }
        return searchParams.get('search') || ''
    })

    return <div>
        <span>Search <sup>by title or postedBy</sup></span>
        <div className="flex gap-4 py-4">
            <input type='search' onChange={(e) => {
                setSearchText(e.target.value)
            }} 
            className="flex-1 p-4 rounded-tl-3xl rounded-bl-3xl rounded-br-xl rounded-tr-xl w-full border border-[#ccc] focus:border-[#000]"
            />
            <button className="rounded-tr-3xl rounded-br-3xl bg-[#dfdf] rounded-bl-xl rounded-tl-xl p-4" onClick={() => {
                const params = new URLSearchParams()
                params.set('page', '1')
                if (searchText) {
                    params.set('search', searchText)
                } else {
                    params.delete('search')
                }
                router.push(pathname + `?${params?.toString()}`)
            }}>
                Search
            </button>
        </div>
    </div>
}

export default Search