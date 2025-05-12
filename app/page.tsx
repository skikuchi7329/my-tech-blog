import Link from "next/link";
import { getPostList } from "@/lib/posts";

export default async function HomePage() {
  const posts = getPostList().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">テックブログ</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
            <p className="text-sm text-gray-500">{post.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}