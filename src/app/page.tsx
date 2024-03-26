import { redirect } from "next/navigation";
import { auth, signOut } from "./auth";
import { getPosts } from "@/db/query";
import Post from "./_components/post";
import Tag from "./_components/tag";
import SortBy from "./_components/sort";

export default async function Home(props: { searchParams: {
  tag?: string | string[]
  sort?: 'DESC' | 'ASC',
  page?: string
} }) {
  const session = await auth()

  if (!session) {
    redirect('/signin')
  }

  const limit = 10
  const pageOffset = ((Number(props?.searchParams?.page) || 1) - 1) * limit

  const tags = props?.searchParams?.tag ? Array.isArray(props?.searchParams?.tag) ? props?.searchParams?.tag : [props?.searchParams?.tag] : undefined
  const hasTags = Boolean(tags) && Array.isArray(tags) && Boolean(tags.length)
  const posts = await getPosts({
    limit,
    offset: pageOffset,
    sort: props?.searchParams?.sort || 'DESC',
    tags,
  })

  return (
    <>
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
      
      <article className="flex flex-col gap-4 max-w-[1200px]">
        {posts?.map((post) => {
          return <Post key={post.id} id={post.id} title={post.title} content={post.content} postedBy={post.postedBy} postedAt={post.postedAt} tags={post.tags} />
        })}
      </article>
      
    </main>
    </>
  );
}
