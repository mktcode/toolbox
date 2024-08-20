"use client";

import { type Prisma } from "@prisma/client";

export type TemplateWithFields = Prisma.TemplateGetPayload<{
  include: { fields: { include: { options: true } } };
}>;

import { useLocalStorage } from "@uidotdev/usehooks";

export default function useTemplateForm(template?: TemplateWithFields) {
  const defaultName = template?.name ?? "My New Template";
  const defaultDescription = template?.description ?? "";
  const defaultBody = template?.body ?? "";
  const defaultIsPublic = template?.isPublic ?? false;
  const defaultAiModel = template?.aiModel ?? "gpt-4o";
  const defaultFields = template?.fields ?? [];

  function key(name: string) {
    return template
      ? `editTemplate.${template.id}.${name}`
      : `newTemplate.${name}`;
  }

  const [name, setName] = useLocalStorage(key("name"), defaultName);
  const [description, setDescription] = useLocalStorage(
    key("description"),
    defaultDescription,
  );
  const [body, setBody] = useLocalStorage(key("body"), defaultBody);
  const [isPublic, setIsPublic] = useLocalStorage(
    key("isPublic"),
    defaultIsPublic,
  );
  const [aiModel, setAiModel] = useLocalStorage(key("aiModel"), defaultAiModel);
  const [fields, setFields] = useLocalStorage(key("fields"), defaultFields);

  function resetForm() {
    setName(defaultName);
    setDescription(defaultDescription);
    setBody(defaultBody);
    setIsPublic(defaultIsPublic);
    setAiModel(defaultAiModel);
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
    aiModel,
    setAiModel,
    fields,
    setFields,
    resetForm,
  };
}
