"use client";

import { Fields } from "../../../_components/form/fields";
import Prompt from "../../../_components/form/prompt";
import { AiModel } from "../../../_components/form/aiModel";
import IsPublic from "../../../_components/form/isPublic";
import Description from "../../../_components/form/description";
import ResponseSchema from "../../../_components/form/responseSchema";
import { type TemplateWithFields } from "../../../_lib/useTemplateForm";

export default function EditTemplateForm({
  template,
}: {
  template: TemplateWithFields;
}) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-white p-8 shadow-sm">
        <Description template={template} />
        <IsPublic template={template} />
        <AiModel template={template} />
      </div>
      <div className="mt-6 rounded-lg bg-white p-8 shadow-sm">
        <Fields template={template} />
        <Prompt template={template} />
      </div>
      <div className="mt-6 rounded-lg bg-white p-8 shadow-sm">
        <ResponseSchema />
      </div>
    </div>
  );
}
