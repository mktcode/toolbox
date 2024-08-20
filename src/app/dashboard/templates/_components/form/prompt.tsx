"use client";

import useTemplateForm, {
  type TemplateWithFields,
} from "../../_lib/useTemplateForm";

export default function Prompt({
  template,
}: {
  template?: TemplateWithFields;
}) {
  const { body, setBody } = useTemplateForm(template);

  return (
    <>
      <label
        htmlFor="about"
        className="mt-6 block font-medium leading-6 text-gray-900"
      >
        Prompt Template
      </label>
      <p className="text-sm leading-6 text-gray-500">
        Write the prompt and use <code>{"{{field_name}}"}</code> to insert
        dynamic content from form fields.
      </p>
      <div className="mb-6 mt-2">
        <textarea
          id="about"
          name="about"
          rows={10}
          placeholder="You are a helpful {{profession}} who loves to {{task}}..."
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
    </>
  );
}
