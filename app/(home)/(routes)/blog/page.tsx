// app/blog/page.tsx
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Search from "@/components/home/Search";
import TagList from "@/components/home/TagList";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  content: string;
  headerImage: string;
  author: string;

  date: string;
  readingTime: string;
}

async function getPosts(): Promise<Post[]> {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_API_URL // Make sure to set this in Vercel
      : "http://localhost:3000";

  const res = await fetch(`${apiUrl}/api/posts`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-theme-500 dark:text-theme-200">
        Blog
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Search posts={posts} />
      </Suspense>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <CardContainer key={post.slug} className="inter-var">
            <CardBody className="bg-muted relative group/card dark:hover:shadow-2xl dark:hover:shadow-theme-500/[0.1] dark:bg-theme-800 dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-theme-500 dark:text-theme-200"
              >
                {post.title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-theme-400 text-sm max-w-sm mt-2 dark:text-theme-300"
              >
                {post.excerpt}
              </CardItem>
              <CardItem
                translateZ="100"
                rotateX={20}
                rotateZ={-10}
                className="w-full mt-4"
              >
                <Image
                  src={post.headerImage}
                  height={1000}
                  width={1000}
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt={post.title}
                />
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  translateX={-40}
                  className="flex items-center"
                >
                  <div>
                    <p className="text-sm font-medium text-theme-500 dark:text-theme-200">
                      {post.author}
                    </p>
                    <p className="text-xs text-theme-400 dark:text-theme-300">
                      {post.date}
                    </p>
                  </div>
                </CardItem>
                <CardItem
                  translateZ={20}
                  translateX={40}
                  as={Link}
                  href={`/blog/${post.slug}`}
                  className="px-4 py-2 rounded-xl bg-theme-500 text-muted text-xs font-bold hover:bg-theme-600 transition-colors"
                >
                  Read More
                </CardItem>
              </div>
              <CardItem translateZ={20} className="mt-4">
                <TagList tags={post.tags} />
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}
