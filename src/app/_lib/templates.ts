export type FormField = {
  name: string;
  label: string;
  type: "text" | "textarea";
  value: string;
};

// single line examples: {=name=}, {= name =}, {= My First-Name =}
// multi line examples: {[description]}, ... (same as single line)
const singleLineRegex = new RegExp(/\{=\s*(\w[\w\s-]*)\s*=\}/, "ig");
const multiLineRegex = new RegExp(/\{\[\s*([\w\s-]*)\s*\]\}/, "ig");

export function parseSingleLineFormField(match: string): FormField {
  const name = match.replace(singleLineRegex, "$1");
  const label = name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return {
    name,
    label,
    type: "text",
    value: "",
  };
}

export function parseMultiLineFormField(match: string): FormField {
  const name = match.replace(multiLineRegex, "$1");
  const label = name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return {
    name: name,
    label,
    type: "textarea",
    value: "",
  };
}

export function parseFields(template: string) {
  const singleLineFields = template.match(singleLineRegex)?.map(parseSingleLineFormField) ?? [];
  const multiLineFields = template.match(multiLineRegex)?.map(parseMultiLineFormField) ?? [];

  return [...singleLineFields, ...multiLineFields];
}