"use client";

import { useLocalStorage } from "@uidotdev/usehooks";

export default function useNewTemplate() {
  const [name, setName] = useLocalStorage(
    "newTemplate.name",
    "My New Template",
  );
  const [description, setDescription] = useLocalStorage(
    "newTemplate.description",
    "",
  );
  const [body, setBody] = useLocalStorage("newTemplate.body", "");
  const [isPublic, setIsPublic] = useLocalStorage(
    "newTemplate.isPublic",
    false,
  );
  const [aiModel, setAiModel] = useLocalStorage(
    "newTemplate.aiModel",
    "gpt-4o",
  );
  const [fields, setFields] = useLocalStorage("newTemplate.fields", []);

  function resetForm() {
    setName("My New Template");
    setDescription("");
    setBody("");
    setIsPublic(false);
    setAiModel("gpt-4o");
    setFields([]);
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
