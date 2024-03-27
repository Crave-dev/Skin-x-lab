'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

function SortBy() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    return <label htmlFor="orderBy">
        Date: 
        <select name="orderBy" id="orderBy" onChange={(e) => {
            const value = e.target.value as ('DESC' | 'ASC')
            const params = new URLSearchParams(searchParams)
            params.set('sort', value)
            params.delete('page')
            console.debug(params.toString(), 'params.toString()')
            router.replace(pathname + `?${params.toString()}`)
        }} defaultValue={'DESC'} className="border border-[#ccc] rounded-xl">
            <option value={'DESC'}>DESC</option>
            <option value={'ASC'}>ASC</option>
        </select>
  </label>
}

export default SortBy