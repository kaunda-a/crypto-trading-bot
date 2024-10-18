// app/api/posts/route.tsx
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(".mdx", ""),
      title: data.title || "",
      excerpt: data.excerpt || "",
      tags: data.tags || [],
      content,
      headerImage: data.headerImage || "",
      author: data.author || "",

      date: data.date || "",
      readingTime: data.readingTime || "",
    };
  });

  return NextResponse.json(posts);
}
