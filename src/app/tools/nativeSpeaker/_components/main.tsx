"use client";

import { type Session } from "next-auth";
import Form from "./form";
import Result from "./result";
import { useState } from "react";
import { type Output } from "~/server/api/routers/nativeSpeaker";

export default function Main({ session }: { session: Session | null }) {
  const [variants, setVariants] = useState<Output["variants"]>([]);

  return (
    <div className="grid grow grid-cols-1 lg:grid-cols-2">
      <Form session={session} setVariants={setVariants} />
      <Result variants={variants} />
    </div>
  );
}
