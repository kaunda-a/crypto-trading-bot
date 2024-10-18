"use client";

import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../../../ui/tracing-beam";
import localFont from "next/font/local";

const geistMonoVF = localFont({
  src: "../../../../app/fonts/GeistMonoVF.woff",
});
const geist = localFont({ src: "../../../../app/fonts/GeistVF.woff" });

export function Info() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {content.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-theme-500 text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p
              className={twMerge(
                geist.className,
                "text-xl mb-4 text-theme-700"
              )}
            >
              {item.title}
            </p>

            <div
              className={twMerge(
                geistMonoVF.className,
                "text-sm prose prose-sm dark:prose-invert"
              )}
            >
              {item?.image && (
                <Image
                  src={item.image}
                  alt="SleekGrid Solar System"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const content = [
  {
    title: "Revolutionizing Solar Energy with SleekGrid",
    description: (
      <>
        <p>
          At SleekGrid, we're pioneering the future of solar energy systems. Our
          cutting-edge technology and innovative designs are transforming how
          homes and businesses harness the power of the sun. With a focus on
          efficiency and aesthetics, SleekGrid solar panels seamlessly integrate
          into any architecture, providing clean, renewable energy without
          compromising on style.
        </p>
        <p>
          Our team of expert engineers and designers work tirelessly to push the
          boundaries of solar technology, ensuring that every SleekGrid
          installation maximizes energy production while minimizing
          environmental impact. We believe in a sustainable future, and we're
          making it a reality, one solar panel at a time.
        </p>
      </>
    ),
    badge: "Innovation",
    image: "/images/solar.jpg",
  },
  {
    title: "The SleekGrid Advantage",
    description: (
      <>
        <p>
          What sets SleekGrid apart is our commitment to excellence in every
          aspect of our solar solutions. From our high-efficiency photovoltaic
          cells to our sleek, low-profile mounting systems, every component is
          designed to deliver optimal performance and durability. Our
          proprietary energy management software allows users to monitor and
          control their energy production in real-time, providing unprecedented
          insight and control over their power consumption.
        </p>
        <p>
          We understand that switching to solar is a significant decision.
          That's why we offer comprehensive consultations, custom system
          designs, and professional installation services. Our goal is to make
          the transition to clean energy as smooth and rewarding as possible for
          our clients.
        </p>
      </>
    ),
    badge: "Technology",
    image: "/images/module.jpg",
  },
  {
    title: "Join the Solar Revolution",
    description: (
      <>
        <p>
          The future of energy is here, and it's brighter than ever. By choosing
          SleekGrid, you're not just investing in a solar system; you're
          investing in a cleaner, more sustainable future for generations to
          come. Our systems are designed to provide decades of reliable, clean
          energy, significantly reducing your carbon footprint and energy costs.
        </p>
        <p>
          Whether you're a homeowner looking to reduce your energy bills, a
          business aiming to meet sustainability goals, or a community seeking
          to create a microgrid, SleekGrid has the expertise and technology to
          meet your needs. Join us in the solar revolution and be part of the
          solution to global energy challenges.
        </p>
      </>
    ),
    badge: "Sustainability",
  },
];

export default Info;
