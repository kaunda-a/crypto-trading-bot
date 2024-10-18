// app/components/Search.tsx
"use client";

import { useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";

const Search = ({ posts }: { posts: any[] }) => {
  const [query, setQuery] = useState("");
  const fuse = new Fuse(posts, { keys: ["title", "tags", "content"] });
  const results = fuse.search(query);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full p-2 border rounded"
      />
      {results.map((result) => (
        <div key={result.item.slug} className="mt-2">
          <Link
            href={`/blog/${result.item.slug}`}
            className="text-blue-600 hover:underline"
          >
            {result.item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Search;
