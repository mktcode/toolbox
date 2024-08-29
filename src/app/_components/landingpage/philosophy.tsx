import { CloudArrowUpIcon, TableCellsIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

export default function Philosophy() {
  return (
    <>
      <a id="product" className="block h-0" />
      <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-indigo-600">
                  Not many features, yet.
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Chat, Search, Custom Templates &amp; Batch-Processing
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  As an average AI user you should not miss much. I've
                  implemented all the standard chat features and a bit more.
                  Templates are super useful for repetitive tasks. And
                  batch-processing is a huge time-saver for large amounts of
                  data.
                </p>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  That's where we start.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <Image
              alt=""
              src="/img/light-project-app-screenshot.png"
              className="w-[48rem] max-w-none rounded-xl shadow-2xl shadow-black/20 sm:w-[57rem]"
              width={1080}
              height={640}
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <ul role="list" className="mb-16 mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <CloudArrowUpIcon
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Continuous Delivery.
                      </strong>{" "}
                      Your feedback has real impact. Every day! I don't publish
                      updates, fixes and release notes once a month or worse. I
                      improve my product everyday, a little bit. And you can see
                      it.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <TableCellsIcon
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    />
                    <div>
                      <strong className="font-semibold text-gray-900">
                        Open Planning and Development.
                      </strong>{" "}
                      There is a public{" "}
                      <Link
                        href="https://github.com/users/mktcode/projects/5"
                        target="_blank"
                        className="text-indigo-500"
                      >
                        Kanban board
                      </Link>
                      . You can see what I'm working on and how I'm preparing
                      the next steps. Contributions are welcome but for the time
                      being there will be only one core developer, thus just one
                      "lane".{" "}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
