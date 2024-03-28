import { redirect } from "next/navigation";
import { auth, signOut } from "./auth";
import { countPosts, getPosts } from "@/db/query";
import Post from "./_components/post";
import Tag from "./_components/tag";
import SortBy from "./_components/sort";
import { unstable_cache } from 'next/cache';
import Pagination from "./_components/pagination";
import { TagProvider } from "./_components/tag.provider";
import Search from "./_components/search";

const postCountCache = unstable_cache(async () => countPosts(), ['post-count'])

export default async function Home(props: { searchParams: {
  tag?: string | string[]
  sort?: 'DESC' | 'ASC',
  page?: string,
  search?: string
} }) {
  const session = await auth()

  if (!session) {
    redirect('/signin')
  }

  const limit = 10
  const page = Number(props?.searchParams?.page) || 1
  const search = props?.searchParams?.search
  const pageOffset = (page - 1) * limit

  const tags = props?.searchParams?.tag ? Array.isArray(props?.searchParams?.tag) ? props?.searchParams?.tag : [props?.searchParams?.tag] : undefined
  const hasTags = Boolean(tags) && Array.isArray(tags) && Boolean(tags.length)
  const [posts] = await Promise.all([getPosts({
    limit,
    offset: pageOffset,
    sort: props?.searchParams?.sort || 'DESC',
    tags,
    search,
  })])

  return (
    <TagProvider tags={tags || []}>
      <nav className="flex p-2 justify-end items-center gap-4">
          <span>{session?.user?.email}</span>
          <form action={async () => {
            'use server'
            await signOut()
          }}>
            <button type='submit' className="bg-[red] text-white rounded-xl p-4">Log out</button>
          </form>
        </nav>
      <main className="min-h-screen sm:p-4 md:p-8 lg:p-24 grid place-content-center">
        <h1 className="font-bold text-xl mb-4 text-center">SkinX Lab</h1>
        <section className="flex align-center justify-between">
          <h2 className="text-lg mb-4 font-semibold">
            Posts
          </h2>
          <SortBy />
        </section>
        <Search />
        {
          hasTags && (
            <section className="flex flex-wrap gap-4 py-4">
              {
                tags?.map((tag) => {
                  return <Tag key={tag} type='closable' value={tag} />
                })
              }
            </section>
          )
        }
        
        <section className="flex flex-col gap-4 max-w-[1200px]">
            <div className="min-h-[50dvh]">
              {posts?.map((post) => {
                return <Post key={post.id} id={post.id} title={post.title} content={post.content} postedBy={post.postedBy} postedAt={post.postedAt} tags={post.tags} />
              })}
            </div>
            <Pagination currentPage={page} hasMore />
        </section>
        
      </main>
    </TagProvider>
  );
}
