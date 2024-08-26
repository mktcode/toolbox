import { DashboardHeader, DashboardHeaderH1 } from "./../_components/layout";

export default async function DashboardBillingPage() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderH1>Billing</DashboardHeaderH1>
      </DashboardHeader>
      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col rounded-xl border border-gray-300 p-4 text-gray-600">
          Here, you will be able to view your top-up and usage history, generate
          invoices, or cash out your remaining balance. It's just not
          implemented yet.
        </div>
      </main>
    </>
  );
}
