import { getServerAuthSession } from "~/server/auth";
import { DashboardHeader, DashboardHeaderH1 } from "./../_components/layout";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolbox / Billing",
  description: "AI tools I've built and use every now and then",
};

export default async function DashboardBillingPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent("/dashboard/billing")}`,
    );
  }

  const topups = await api.topup.getAllForUser();

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderH1>Billing - Top ups</DashboardHeaderH1>
      </DashboardHeader>
      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col rounded-xl border border-gray-300 p-4 text-gray-600">
          Here, you will be able to view your top-up and usage history, generate
          invoices, or cash out your remaining balance. It's just not
          implemented yet.
        </div>
        <div className="mx-auto mt-4 w-full max-w-3xl rounded-lg bg-white">
          {topups.map((topup) => (
            <div
              key={topup.id}
              className="flex w-full flex-col rounded-lg p-4 text-gray-600"
            >
              <div className="flex justify-between">
                <div className="flex flex-col">
                  {topup.createdAt.toLocaleDateString()}
                  <span className="text-sm text-gray-500">{topup.note}</span>
                </div>
                <div className="font-semibold">
                  {topup.amount?.toFixed(2)} €
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
