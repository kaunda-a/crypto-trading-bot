// app/components/TableOfContents.tsx
"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const TableOfContents = () => {
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3"));
    setHeadings(elements as HTMLHeadingElement[]);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="toc">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`mb-2 ${heading.tagName === "H3" ? "ml-4" : ""} ${
              activeId === heading.id ? "text-theme-500" : ""
            }`}
          >
            <a href={`#${heading.id}`}>{heading.textContent}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
