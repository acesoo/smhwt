import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getResources } from "@/app/actions/resources";
import { ResourceLibrary } from "@/components/resource-library";
import BottomNav from "@/components/BottomNav";
import { ProfileDropdown } from "@/components/ProfileDropdown";

export const metadata = { title: "Resources — SMHWT" };

export default async function ResourcesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const userName =
    user.user_metadata?.full_name?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    "?";

  const { data, error } = await getResources();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-md md:max-w-7xl min-h-screen flex flex-col relative border-x border-neutral-800/60">

        <header className="sticky top-0 z-10 bg-neutral-950/90 backdrop-blur-md flex items-center justify-between px-4 py-4 border-b border-neutral-800">
          <span className="w-10" />
          <h1 className="text-base font-semibold text-neutral-100">Resources</h1>
          <ProfileDropdown username={userName} />
        </header>

        <div className="flex-1">
          <ResourceLibrary initialResources={data ?? []} fetchError={error} />
        </div>

        <BottomNav />
      </div>
    </div>
  );
}