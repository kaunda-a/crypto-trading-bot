"use client";

import React from "react";
import Navbar from "@/components/home/routes/navbar";
import Footer from "@/components/home/routes/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
