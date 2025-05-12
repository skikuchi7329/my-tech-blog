import { notFound } from "next/navigation";
import { getPostBySlug, getPostList } from "@/lib/posts";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = getPostList();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">{post.meta.title}</h1>
      <p className="text-sm text-gray-500">{post.meta.date}</p>
      <article
        className="mt-6 prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  );
}