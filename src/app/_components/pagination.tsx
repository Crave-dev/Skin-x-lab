'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface Props {
    currentPage: number
    hasMore: boolean
}

function Pagination(props: Props) {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const nextPage = props?.currentPage + 1
    const prevPage = props?.currentPage - 1

    const hasPrev = Boolean(prevPage)
    const hasNext = props?.hasMore

    const prev = () => {
        if (!prevPage) return
        const params = new URLSearchParams(searchParams)
        params.set('page', prevPage.toString())
        router.push(pathname+`?${params.toString()}`)
    }

    const next = () => {
        if (!nextPage) return
        const params = new URLSearchParams(searchParams)
        params.set('page', nextPage.toString())
        router.push(pathname+`?${params.toString()}`)
    }

    return <div className="flex gap-12 items-center self-center">
        <button disabled={!hasPrev} onClick={prev} className="p-4 border boder-[#ccc] rounded-xl">Prev</button>
        <button disabled={!hasNext} onClick={next} className="p-4 border boder-[#ccc] rounded-xl">Next</button>
    </div>
}

export default Pagination