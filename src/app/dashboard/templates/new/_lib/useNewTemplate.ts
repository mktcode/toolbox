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
  const [fields, setFields] = useLocalStorage("newTemplate.fields", []);

  function resetForm() {
    setName("My New Template");
    setDescription("");
    setBody("");
    setFields([]);
  }

  return {
    name,
    setName,
    description,
    setDescription,
    body,
    setBody,
    fields,
    setFields,
    resetForm,
  };
}
