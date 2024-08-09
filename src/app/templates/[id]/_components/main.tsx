'use client';

import { parseFields } from "~/app/_lib/templates";
import { type Template } from "@prisma/client";

export default function Main(params: { template: Template }) {
  const { template } = params;
  const fields = parseFields(template.body);

  return (
    <div className="flex flex-col items-center justify-center gap-12 px-4">
      {template && <div className="flex w-full min-h-screen">
        <div className="pr-12 py-12">
          <h1>{template.name}</h1>
          <div className="flex flex-col">
            {fields.map((field, index) => {
              return <div key={index} className="flex flex-col mt-2">
                <label>{field.label}</label>
                {field.type === "text" && <input className="mt-1" />}
                {field.type === "textarea" && <textarea className="mt-1" />}
              </div>;
            })}
          </div>
        </div>
        <div className="pl-12 py-12 border-l grow">
          result
        </div>
      </div>}
      {!template && <h1>Template not found.</h1>}
    </div>
  );
}