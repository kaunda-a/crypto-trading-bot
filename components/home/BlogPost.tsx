//components/Blog.tsx
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import TableOfContents from "./TableOfContents";
import TagList from "./TagList";

const Blog = ({
  source,
  frontmatter,
}: {
  source: any;
  frontmatter: {
    headerImage: string;
    title: string;
    date: string;
    tags: string[];
  };
}) => {
  return (
    <article className="max-w-4xl mx-auto">
      <header>
        <Image
          src={frontmatter.headerImage}
          alt={frontmatter.title}
          width={1200}
          height={600}
          className="rounded-lg shadow-lg"
        />
        <h1 className="text-4xl font-bold mt-4">{frontmatter.title}</h1>
        <p className="text-gray-600">{frontmatter.date}</p>
        <TagList tags={frontmatter.tags} />
      </header>
      <div className="flex mt-8">
        <aside className="w-1/4">
          <TableOfContents />
        </aside>
        <main className="w-3/4">
          <MDXRemote {...source} />
        </main>
      </div>
    </article>
  );
};

export default Blog;
