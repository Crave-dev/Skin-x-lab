import { redirect } from "next/navigation";
import { auth, signOut } from "./auth";
import { getPosts } from "@/db/query";
import Post from "./_components/post";

export default async function Home(props: { searchParams: Record<string, string> }) {
  const session = await auth()

  if (!session) {
    redirect('/signin')
  }

  const searchParams = new URLSearchParams(props?.searchParams)

  const limit = 10
  const pageOffset = ((Number(searchParams.get('page')) || 1) - 1) * limit

  const posts = await getPosts({
    limit,
    offset: pageOffset,
    sort: 'DESC',
    tags: ['guava']
  })

  console.log(JSON.stringify(posts, null, 2), 'posts')

  return (
    <>
    <nav className="flex p-2 justify-end">
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
        <label htmlFor="orderBy">
          <select name="orderBy" id="orderBy" defaultValue={'DESC'} className="border border-[#ccc] rounded-xl">
            <option>DESC</option>
            <option>ASC</option>
          </select>
        </label>
      </section>
      
      <article className="flex flex-col gap-4 max-w-[1200px]">
        {posts?.map((post) => {
          return <Post key={post.id} id={post.id} title={post.title} content={post.content} postedBy={post.postedBy} postedAt={post.postedAt} tags={post.tags} />
        })}
      </article>
      
    </main>
    </>
  );
}
