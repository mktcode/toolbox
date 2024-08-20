"use client";

import { Fields } from "../../_components/form/fields";
import Prompt from "../../_components/form/prompt";
import { AiModel } from "../../_components/form/aiModel";
import IsPublic from "../../_components/form/isPublic";
import Description from "../../_components/form/description";
import ResponseSchema from "../../_components/form/responseSchema";

export default function NewTemplateForm() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-white p-8 shadow-sm">
        <Description />
        <IsPublic />
        <AiModel />
        <Fields />
        <Prompt />
        <ResponseSchema />
      </div>
    </div>
  );
}
