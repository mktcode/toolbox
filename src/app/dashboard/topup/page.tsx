import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function TopUpPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent("/dashboard/topup")}`,
    );
  }

  const topupUrl = await api.topup.createTopUp();

  redirect(topupUrl);
}
