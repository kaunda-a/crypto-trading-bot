"use client";

import { TracingBeam } from "@/components/ui/tracing-beam";
import { Button } from "@/components/ui/button";

export default function AbusePage() {
  return (
    <div className="pt-20 pb-16 px-4">
      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased">
          <h1 className="text-3xl font-bold text-theme-700 mb-6">
            Report Abuse
          </h1>

          <p className="text-gray-700 mb-6">
            At Crypto-Bot, we take abuse seriously. If you've encountered any
            misuse of our services or have concerns about inappropriate
            behavior, please report it here.
          </p>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-theme-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme-300 focus:ring focus:ring-theme-200 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-theme-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme-300 focus:ring focus:ring-theme-200 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-theme-600"
              >
                Description of Abuse
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme-300 focus:ring focus:ring-theme-200 focus:ring-opacity-50"
              ></textarea>
            </div>

            <Button onClick={() => console.log("Report submitted")}>
              Submit Report
            </Button>
          </form>
        </div>
      </TracingBeam>
    </div>
  );
}
