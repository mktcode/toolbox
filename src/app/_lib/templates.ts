export function replaceFields(
  template: string,
  values: Record<string, string>,
) {
  return Object.entries(values).reduce((acc, [name, value]) => {
    const placeholderRegExp = new RegExp(`{{\\s*${name}\\s*}}`, "ig");

    return acc.replace(placeholderRegExp, value);
  }, template);
}
