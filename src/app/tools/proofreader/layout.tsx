import ToolLayout from "../_components/layout";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolbox / Proofreader",
};

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ToolLayout>{children}</ToolLayout>;
}
