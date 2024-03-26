import {
    timestamp,
    pgTable,
    text,
    serial,
  } from "drizzle-orm/pg-core"

export const post = pgTable("post", {
    id: serial('id').primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    postedBy: text("postedBy").notNull(),
    postedAt: timestamp('postedAt', { withTimezone: true }).notNull(),
    tags: text('tags').array(),
})