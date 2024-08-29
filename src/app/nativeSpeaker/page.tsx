import { Field, Input, Label } from "@headlessui/react";

export default async function NativeSpeakerPage() {
  return (
    <div>
      <Field>
        <Label>Target Language</Label>
        <Input />
      </Field>
    </div>
  );
}
