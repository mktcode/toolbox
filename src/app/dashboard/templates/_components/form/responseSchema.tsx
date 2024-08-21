"use client";

export default function ResponseSchema() {
  return (
    <>
      <label
        htmlFor="about"
        className="block font-medium leading-6 text-gray-900"
      >
        Response Schema
      </label>
      <p className="text-sm leading-6 text-gray-500">
        Write the prompt and use <code>{"{{field_name}}"}</code> to insert
        dynamic content from form fields.
      </p>
      <div className="relative mt-3 flex gap-x-3">
        <div className="flex h-6 items-center">
          <input
            id="structuredResponse"
            name="structuredResponse"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
        <div className="text-sm leading-6">
          <label
            htmlFor="structuredResponse"
            className="font-medium text-gray-900"
          >
            Use structured response
          </label>
          <p className="text-gray-500">
            Define a JSON schema that the response should adhere to.
          </p>
        </div>
      </div>
    </>
  );
}
