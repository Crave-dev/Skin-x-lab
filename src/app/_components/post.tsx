'use client'

import { useState } from "react";
import Tag from "./tag";
import { useTag } from "./tag.provider";

interface Props {
    id: number;
    title: string;
    content: string;
    postedBy: string;
    postedAt: Date;
    tags: string[] | null;
}

function Post({ id, title, content, postedAt, postedBy, tags }: Props) {
    const [open, setOpen] = useState(false)
    const tagSet = useTag()

    return (<div className="flex flex-col rounded-xl shadow-xl bg-white p-6 gap-4" tabIndex={0}>
    <p title={title} className="font-medium text-xl">{title}</p>
    <div>
        <div dangerouslySetInnerHTML={{ __html: content }} className={(open ? 'max-h-fit overflow-auto' : 'max-h-[200px] overflow-y-hidden')} />
        <span tabIndex={0} className="hover:underline" onClick={() => setOpen(prev => !prev)}>{open ? 'show less' : 'show more'}</span>
    </div>
    <div className="flex justify-between">
        <ul className="flex gap-2">
            {tags?.map((tag) => {
                return <Tag type='openable' value={tag} key={tag} isFiltered={tagSet.has(tag)} />
            })}
        </ul>
        <span>By {postedBy} | <time dateTime={postedAt.toISOString()}>{postedAt.toLocaleDateString()}</time></span>
    </div>
  </div>)
}

export default Post