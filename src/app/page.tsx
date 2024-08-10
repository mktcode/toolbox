import Link from "next/link";
import { getFlags } from "~/server/unleash";
import Philosophy from "./_components/philosophy";

export default async function ProjectsPage() {
  const flags = await getFlags();

  return (
    <div>
      <div className="relative bg-cover h-screen flex flex-col" style={{ backgroundImage: "url('/landing-bg.jpg')" }}>
        <div className="text-white flex items-center px-24 pt-12">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" className="w-10 mr-4">
            <path d="M14.5 17c0 1.65-1.35 3-3 3s-3-1.35-3-3h2c0 .55.45 1 1 1s1-.45 1-1s-.45-1-1-1H2v-2h9.5c1.65 0 3 1.35 3 3zM19 6.5C19 4.57 17.43 3 15.5 3S12 4.57 12 6.5h2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S16.33 8 15.5 8H2v2h13.5c1.93 0 3.5-1.57 3.5-3.5zm-.5 4.5H2v2h16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5v2c1.93 0 3.5-1.57 3.5-3.5S20.43 11 18.5 11z" fill="currentColor" />
          </svg>
          <h1 className="text-2xl font-bold">
            Senior
          </h1>
          <div className="flex ml-auto space-x-12 tracking-widest">
            <Link href="#features" className="text-white border-b-2 pb-1 font-light border-b-transparent hover:text-white hover:border-b-white">
              Features
            </Link>
            <Link href="#integrations" className="text-white border-b-2 pb-1 font-light border-b-transparent hover:text-white hover:border-b-white">
              Integrations
            </Link>
            <Link href="#pricing" className="text-white border-b-2 pb-1 font-light border-b-transparent hover:text-white hover:border-b-white">
              Pricing
            </Link>
          </div>
        </div>
        <div className="pt-72 pl-24">
          <h1 className="text-6xl text-white font-bold leading-tight">
            Moving Fast.<br />
            From Idea to Plan.
          </h1>
          <p className="text-2xl text-white/60 mt-6 max-w-screen-md font-light">
            Senior is an AI assistant for software project management. It empowers teams to plan and build better software, faster. With seamless integrations like GitHub and Jira, Senior accelerates your entire development process from idea to execution.
          </p>
          <div className="flex mt-12">
            <input type="text" placeholder="Enter your email" className="bg-transparent w-full max-w-96 text-white mr-3 py-4 px-8 border border-white rounded mt-6 transition-all" />
            <Link href="/">
              <button className="bg-white font-semibold text-xl text-black hover:text-gray-700 py-4 px-8 rounded mt-6 transition-all">
                Sign up for beta access!
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h2 className="text-7xl font-extrabold sm:text-4xl">
              Features
            </h2>
            <p className="mt-4 text-2xl text-gray-400 font-light">
              Everything you need to manage your software projects efficiently.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">
                Start with a new idea
              </h3>
              <p className="text-gray-400 font-light text-lg">
                Generate useful content from a few notes or discuss your idea first with the assistant.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">
                Import existing documentation
              </h3>
              <p className="text-gray-400 font-light text-lg">
                Get useful feedback and refine your plan based on your current documentation.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">
                Share and implement
              </h3>
              <p className="text-gray-400 font-light text-lg">
                Share your plan with your team, import tasks into your backlog and start building.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">
                Grow
              </h3>
              <p className="text-gray-400 font-light text-lg">
                Add new aspects to your plan, refine your tasks and keep track of your progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-7xl font-extrabold sm:text-4xl">
            Integrations
          </h2>
          <p className="mt-4 text-2xl text-gray-400 font-light">
            Connect Senior with your favorite tools.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">
              GitHub
            </h3>
            <p className="text-gray-300">
              Create issues and more from Senior or import data from GitHub.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">
              Jira
            </h3>
            <p className="text-gray-300">
              Create issues and more from Senior or import data from Jira.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">
              Slack
            </h3>
            <p className="text-gray-300">
              Get notifications in Slack when something changes in Senior.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h2 className="text-7xl font-extrabold sm:text-4xl text-white">
              Pricing
            </h2>
            <p className="mt-4 text-2xl text-gray-400 font-light">
              Choose the plan that fits your needs.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-lg p-6 text-white border border-cyan-200/30">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                Solo
              </h3>
              <p className="text-3xl font-bold mb-4">
                $0<span className="text-xl font-normal">/month</span>
              </p>
              <ul className="mb-8 text-lg">
                <li>
                  1 user
                </li>
                <li>$1/100,000 Tokens</li>
                <li>Limited ChatGPT Plus features</li>
              </ul>
              <Link href="/projects">
                <button className="w-full px-6 py-4 bg-white text-gray-900 rounded-md hover:bg-gray-100 text-xl">
                  Get Started
                </button>
              </Link>
            </div>
            <div className="rounded-lg p-6 text-white border border-blue-200/30">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                Power
              </h3>
              <p className="text-3xl font-bold mb-1">
                $10<span className="text-xl font-normal">/month</span>
              </p>
              <div className="mb-3">
                $0.50/100,000 Tokens
              </div>
              <ul className="mb-8 text-lg">
                <li>
                  1 user
                </li>
                <li>All ChatGPT Plus features</li>
              </ul>
              <button className="w-full px-6 py-4 bg-white text-gray-900 rounded-md hover:bg-gray-100 text-xl">
                Subscribe
              </button>
            </div>
            <div className="rounded-lg p-6 text-white border border-purple-200/30">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">
                Team
              </h3>
              <p className="text-3xl font-bold mb-4">
                $25<span className="text-xl font-normal">/month</span>
              </p>
              <ul className="mb-8 text-lg">
                <li>
                  Unlimited users
                </li>
                <li>$0.25/100,000 Tokens</li>
                <li>All ChatGPT Plus features</li>
              </ul>
              <button className="w-full px-6 py-4 bg-white text-gray-900 rounded-md hover:bg-gray-100 text-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {flags.isEnabled("landingpage.philosphy") && <Philosophy />}

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Company
              </h3>
              <ul className="space-y-2 font-light">
                <li>
                  <Link href="/" className="hover:underline text-gray-500">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline text-gray-500">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline text-gray-500">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline text-gray-500">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Support
              </h3>
              <ul className="space-y-2 font-light">
                <li>
                  <Link href="/" className="hover:underline text-gray-500">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline text-gray-500">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline text-gray-500">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline text-gray-500">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a href="https://twitter.com" target="_blank" className="hover:underline text-gray-500">
                  <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M24 4.557a9.835 9.835 0 0 1-2.828.775A4.934 4.934 0 0 0 23.337 3a9.867 9.867 0 0 1-3.127 1.195A4.918 4.918 0 0 0 16.616.64a4.918 4.918 0 0 0-4.834 6.045A13.978 13.978 0 0 1 1.67 3.15 4.822 4.822 0 0 0 3.15 9.6a4.902 4.902 0 0 1-2.228-.616v.061a4.923 4.923 0 0 0 3.946 4.828 4.908 4.908 0 0 1-2.224.084 4.924 4.924 0 0 0 4.598 3.417A9.867 9.867 0 0 1 .96 20.547a13.937 13.937 0 0 0 7.548 2.213c9.057 0 14.01-7.506 14.01-14.012 0-.213-.005-.425-.014-.637A10.012 10.012 0 0 0 24 4.557z" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" className="hover:underline text-gray-500">
                  <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M22.675 0H1.325C.594 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.414c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.462.098 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.311h3.591l-.468 3.622h-3.123V24h6.116c.729 0 1.322-.593 1.322-1.324V1.325C24 .593 23.407 0 22.675 0z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" className="hover:underline text-gray-500">
                  <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M22.23 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.22.78 24 1.77 24h20.46C23.22 24 24 23.22 24 22.27V1.73C24 .78 23.22 0 22.23 0zM7.12 20.45H3.56V9H7.12v11.45zm-1.78-13.04h-.02c-1.19 0-1.95-.82-1.95-1.85 0-1.05.77-1.85 1.97-1.85 1.2 0 1.95.8 1.97 1.85-.02 1.03-.77 1.85-1.97 1.85zM20.45 20.45h-3.56v-5.56c0-1.4-.5-2.36-1.76-2.36-.95 0-1.51.65-1.75 1.28-.09.21-.11.51-.11.8v5.84h-3.56s.05-9.48 0-10.45h3.56v1.48c.47-.74 1.31-1.8 3.19-1.8 2.33 0 4.08 1.52 4.08 4.79v6.97h-.01z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-24 text-center text-gray-400 font-light">
            <p>&copy; 2024 Markus Kottländer.<br />All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}