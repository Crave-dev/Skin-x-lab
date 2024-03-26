import { insertPosts } from "@/db/query"
import { promises as fs } from "fs"
import DOMPurify from "isomorphic-dompurify"
import { z } from "zod"

type PostFile = {
    title: string
    content: string
    postedAt: string
    postedBy: string
    tags: string[]
}[]

const postSchema = z.object({
    title: z.string(),
    content: z.string(),
    postedBy: z.string(),
    postedAt: z.string().datetime(),
    tags: z.array(z.string()),
});

const postsSchema = z.array(postSchema);

(async function() {
    console.log('start inserting posts.')
    const file = await fs.readFile(process.cwd() + '/posts.json', 'utf-8')
    const rawData = await JSON.parse(file) as PostFile
    
    const parsed = postsSchema.safeParse(rawData)

    if (parsed.success === false) {
        console.error(parsed.error)
        process.exit()
    } else {
        console.log('validated!')
    }

    const data = rawData.map((d) => ({
        title: d.title,
        content: DOMPurify.sanitize(d.content),
        postedBy: d.postedBy,   
        postedAt: new Date(d.postedAt),
        tags: d.tags
    }))
    
    console.log(`start inserting ${data.length} posts.`)

    const insertedPosts = await insertPosts(data)
    
    console.log(`inserted ${insertedPosts.length} posts success.`)
    process.exit()
})()