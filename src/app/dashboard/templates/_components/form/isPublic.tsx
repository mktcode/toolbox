"use client";

import useTemplateForm, {
  type TemplateWithFields,
} from "../../_lib/useTemplateForm";

export default function IsPublic({
  template,
}: {
  template?: TemplateWithFields;
}) {
  const { isPublic, setIsPublic } = useTemplateForm(template);

  return (
    <label
      htmlFor="comments"
      className="relative flex cursor-pointer gap-x-3 rounded-lg border p-3"
    >
      <div className="flex h-6 items-center">
        <input
          id="comments"
          name="comments"
          type="checkbox"
          className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
      </div>
      <div className="text-sm leading-6">
        <div className="font-medium text-gray-900">Make public</div>
        <p className="text-gray-500">
          Allow everyone to use this template. You can always change this later.
        </p>
      </div>
    </label>
  );
}
