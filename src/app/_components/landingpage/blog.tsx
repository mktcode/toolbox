const posts = [
  {
    id: 1,
    title: "Capabilities and Limitations of LLMs",
    href: "#",
    description:
      "Large Language Models (LLMs) have revolutionized natural language processing by excelling in tasks like text generation and comprehension, but they also face significant limitations that impact their practical applications.",
    date: "Mar 16, 2024",
    datetime: "2024-03-16",
    author: {
      name: "Markus Kottländer",
      role: "Founder / CTO",
      href: "#",
      imageUrl: "https://avatars.githubusercontent.com/u/6792578?v=4",
    },
  },
  {
    id: 2,
    title: "How I use AI",
    href: "#",
    description:
      "I rely on AI pretty heavily. It autocompletes most of the code I write, it makes sure my English sounds like that of a native speaker or spots flaws in my ideas. Many people don't trust AI that much yet.",
    date: "Mar 10, 2024",
    datetime: "2024-03-10",
    author: {
      name: "Markus Kottländer",
      role: "Founder / CTO",
      href: "#",
      imageUrl: "https://avatars.githubusercontent.com/u/6792578?v=4",
    },
  },
];

export default function Blog() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn about AI and software development.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  alt=""
                  src={post.author.imageUrl}
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
