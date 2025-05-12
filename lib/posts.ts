import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export type PostMeta = {
  title: string;
  date: string;
  tags: string[];
  slug: string;
};

export type PostData = {
  meta: PostMeta;
  contentHtml: string;
};

export function getPostList(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return {
      ...(data as Omit<PostMeta, "slug">),
      slug,
    };
  });
}

export async function getPostBySlug(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    meta: {
      ...(data as Omit<PostMeta, "slug">),
      slug,
    },
    contentHtml,
  };
}