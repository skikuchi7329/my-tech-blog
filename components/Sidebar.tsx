import Link from "next/link";
import { getPostList } from "@/lib/posts";

export async function Sidebar() {
  const posts = getPostList().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">新着記事</h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="text-blue-600 hover:underline block"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
