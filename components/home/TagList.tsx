// app/components/TagList.tsx
import Link from "next/link";

const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/blog/tag/${tag}`}
          className="px-3 py-1 bg-theme-100 text-theme-700 rounded-full text-sm hover:bg-theme-200 transition-colors"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default TagList;
