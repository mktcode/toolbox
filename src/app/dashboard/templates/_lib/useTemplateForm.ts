"use client";

import { type Prisma } from "@prisma/client";
import { useLocalStorage } from "@uidotdev/usehooks";

export type TemplateWithFields = Prisma.TemplateGetPayload<{
  include: {
    fields: { include: { options: true } };
    llm: true;
  };
}>;

export default function useTemplateForm(template: TemplateWithFields) {
  function key(name: string) {
    return `editTemplate.${template.id}.${name}`;
  }

  const [name, setName] = useLocalStorage(key("name"), template.name);
  const [description, setDescription] = useLocalStorage(
    key("description"),
    template.description,
  );
  const [body, setBody] = useLocalStorage(key("body"), template.body);
  const [isPublic, setIsPublic] = useLocalStorage(
    key("isPublic"),
    template.isPublic,
  );
  const [llmId, setLlmId] = useLocalStorage(key("llmId"), template.llm.id);
  const [fields, setFields] = useLocalStorage(key("fields"), template.fields);

  function resetForm() {
    setName(template.name);
    setDescription(template.description);
    setBody(template.body);
    setIsPublic(template.isPublic);
    setLlmId(template.llm.id);
    setFields(template.fields);
  }

  return {
    name,
    setName,
    description,
    setDescription,
    body,
    setBody,
    isPublic,
    setIsPublic,
    llmId,
    setLlmId,
    fields,
    setFields,
    resetForm,
  };
}
