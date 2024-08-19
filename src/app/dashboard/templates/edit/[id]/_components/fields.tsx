import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";

const fields = [
  {
    id: "text",
    name: "Text Field",
    type: "text",
    description: "A simple text field for free-form text.",
  },
  {
    id: "choice",
    name: "Choice Field",
    type: "choice",
    description: "A multiple-choice field for predefined options.",
    options: [
      { id: "yes", name: "Yes" },
      { id: "no", name: "No" },
    ],
  },
];

export function Fields() {
  return (
    <>
      <label
        htmlFor="about"
        className="mt-6 block font-medium leading-6 text-gray-900"
      >
        Prompt Form
      </label>
      <p className="text-sm leading-6 text-gray-500">
        Use form fields for dynamic content in the prompt. Use{" "}
        <code>{"{{field_name}}"}</code> in the prompt template, to insert the
        content when using the template.
      </p>
      <div className="mt-2 rounded-md border">
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex items-center border-b p-4 last:border-b-0"
          >
            <div>
              <div className="font-medium">{field.name}</div>
              <div className="text-sm text-gray-500">{field.description}</div>
            </div>
            <div className="ml-auto">
              <button className="button shy">
                <TrashIcon className="mr-1 h-4 w-4 opacity-30" />
              </button>
            </div>
          </div>
        ))}
        {fields.length === 0 && (
          <div className="p-6 text-center text-xl text-gray-300">
            No form fields added yet.
          </div>
        )}
        <div className="my-6 flex justify-center gap-x-2">
          <button className="button shy">
            <PlusIcon className="mr-1 h-4 w-4 opacity-30" />
            Text Field
          </button>
          <button className="button shy">
            <PlusIcon className="mr-1 h-4 w-4 opacity-30" />
            Choice Field
          </button>
        </div>
      </div>
    </>
  );
}
