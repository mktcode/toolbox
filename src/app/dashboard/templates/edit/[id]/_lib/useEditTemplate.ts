"use client";

import { type Template } from "@prisma/client";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function useEditTemplate(template: Template) {
  const [name, setName] = useLocalStorage(
    `editTemplate.${template.id}.name`,
    template.name,
  );
  const [description, setDescription] = useLocalStorage(
    `editTemplate.${template.id}.description`,
    template.description,
  );
  const [body, setBody] = useLocalStorage(
    `editTemplate.${template.id}.body`,
    template.body,
  );
  const [fields, setFields] = useLocalStorage(
    `editTemplate.${template.id}.fields`,
    [], // Todo: Load fields from template, not done yet because of ts
  );
  const [isPublic, setIsPublic] = useLocalStorage(
    `editTemplate.${template.id}.isPublic`,
    template.isPublic,
  );
  const [aiModel, setAiModel] = useLocalStorage(
    `editTemplate.${template.id}.aiModel`,
    template.aiModel,
  );

  function resetForm() {
    setName(template.name);
    setDescription(template.description);
    setBody(template.body);
    setIsPublic(template.isPublic);
    setAiModel(template.aiModel);
    setFields([]);
  }

  return {
    id: template.id,
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
