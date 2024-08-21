import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

export default function Philosophy() {
  return (
    <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">
                Built with love
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Really! I&apos;m a solo dev. I just can&apos;t help it.
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                I have more than 20 years of experience in software development.
                But I would never call myself a professional. I&apos;m a
                hobbyist. And that&apos;s a good thing.
                <br />
                <br />
                I'm building this not to become rich. (Liar!) Just to sustain
                myself. I'm only one single person but I can react quickly to
                your needs. At scale.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image
            alt=""
            src="/img/dark-project-app-screenshot.png"
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            width={1080}
            height={640}
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
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
                    it.{" "}
                    <Link href={`/`} className="text-indigo-500">
                      Sign up for beta access
                    </Link>{" "}
                    and sit next to me while I'm building stuff.{" "}
                    <Link
                      href={`https://maps.google.com`}
                      target="_blank"
                      className="text-indigo-500"
                    >
                      Literally
                    </Link>
                    .
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      One Product. A thousand needs.
                    </strong>{" "}
                    I'm adaptive and my software is too. I'm not building a
                    product for a specific use case. I'm building a platform. A
                    platform that can be used for a thousand different things.
                    And I'm here to help you to find out how.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Database backups.
                    </strong>{" "}
                    Ac tincidunt sapien vehicula erat auctor pellentesque
                    rhoncus. Et magna sit morbi lobortis.
                  </span>
                </li>
              </ul>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                No server? No problem.
              </h2>
              <p className="mt-6">
                Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam
                consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod
                vitae interdum mauris enim, consequat vulputate nibh. Maecenas
                pellentesque id sed tellus mauris, ultrices mauris. Tincidunt
                enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam
                turpis ipsum eu a sed convallis diam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
