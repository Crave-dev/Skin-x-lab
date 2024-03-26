'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { CSSProperties } from "react"

interface BaseProps {
    style?: CSSProperties
    value: string
}

interface ClosableProps {
    type: 'closable'
}

interface OpenableProps {
    type: 'openable'
}

function Tag(props: BaseProps & (ClosableProps | OpenableProps)) {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    if (props?.type === 'closable') {
        return (<span style={props?.style} className="flex items-center p-2 gap-2 rounded-lg border border-[#ccc]">
            <span>{props?.value}</span>
            <button className="w-4 h-4" onClick={(e) => {
                const params = new URLSearchParams(searchParams)
                const oldTags = [...searchParams.getAll('tag')]
                params.delete('tag', props.value)
                oldTags?.forEach((tag) => {
                    if (tag !== props?.value) {
                        params.append('tag', tag)
                    }
                })
                console.log(params.toString(), 'params.toString()')
                params.delete('page', props.value)
                router.replace(pathname + `?${params.toString()}`)
            }}>
                <svg height="512px" viewBox="0 0 512 512" width="512px" className="w-4 h-4">
                    <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>
                </svg>
            </button>
        </span>)
    }

    return (<button 
            onClick={(e) => {
                const params = new URLSearchParams(searchParams)
                params.append('tag', props.value)
                params.delete('page', props.value)
                router.replace(pathname + `?${params.toString()}`)
            }}
            style={props?.style}
            className="px-2 rounded-lg border border-[#ccc] hover:contrast-0 hover:underline"
        >
            {props?.value}
        </button>)
}

export default Tag