import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { addDiscordWebhookUrl } from "@/utils/supabase/requests";
import DiscordButton from "./DiscordButton";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  const onAddDiscordWUrlClick = async (webhookUrl: any) => {
    "use server";

    if (!user) return;
    const added = await addDiscordWebhookUrl(user.id, webhookUrl);
    if (added) {
      redirect("/protected");
    } else {
      console.error("Couldn't add discord webhook URL. Try again.");
    }
  };

  return user ? (
    <div className="flex items-center gap-2">
      <div className="flex flex-row align-center gap-2">
        <p className="hidden sm:block pt-1">Hey, {user.email}!</p>
        <span><DiscordButton onAddDiscordWUrlClick={onAddDiscordWUrlClick} /></span>
      </div>
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
