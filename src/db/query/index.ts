import { and, arrayContains, asc, count, desc, eq, ilike, or } from 'drizzle-orm'
import { db } from '../'
import * as schema from '../schema'

export type Posts = typeof schema.post.$inferInsert
export type User = typeof schema.users.$inferInsert

export async function insertPosts(posts: Posts[]) {
    return db.insert(schema.post).values(posts).returning()
}

export async function createUser(user: User) {
    return db.insert(schema.users).values(user).returning()
}

export async function getUserFromEmail(email: string) {
    return db.query.users.findFirst({
        where: (user) => eq(user.email, email) 
    })
}

export async function countPosts() {
    return db
        .select({ count: count() })
        .from(schema.post)
}

export async function getPosts({ sort, limit, offset, tags, search }: { limit: number; offset: number; sort: 'DESC' | 'ASC'; tags?: string[], search?: string }) {
    return db
        .select()
        .from(schema.post)
        .where((post) => and(...[
            search ? or(ilike(post.title, `%${search}%`), ilike(post.postedBy, `%${search}%`)) : undefined,
            (tags && Array.isArray(tags) && tags.length) ? arrayContains(post.tags, tags) : undefined
        ]))
        .orderBy((post) => [sort === 'DESC' ? desc(post.postedAt) : asc(post.postedAt)])
        .offset(offset)
        .limit(limit)
}