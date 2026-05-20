import { getSession } from "@/lib/auth";
import { SiteHeader } from "@/components/site-header";

export async function SiteHeaderShell({
  ready,
}: {
  ready: boolean;
}) {
  const session = await getSession();
  return <SiteHeader ready={ready} user={session} />;
}
