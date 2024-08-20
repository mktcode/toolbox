"use client";

import useTemplateForm, {
  type TemplateWithFields,
} from "../../_lib/useTemplateForm";

export default function Description({
  template,
}: {
  template?: TemplateWithFields;
}) {
  const { description, setDescription } = useTemplateForm(template);

  return (
    <>
      <label
        htmlFor="about"
        className="block font-medium leading-6 text-gray-900"
      >
        Description
      </label>
      <p className="text-sm leading-6 text-gray-500">
        Explain what the template does in a few words or sentences.
      </p>
      <div className="mb-6 mt-2">
        <textarea
          id="about"
          name="about"
          rows={3}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </>
  );
}
