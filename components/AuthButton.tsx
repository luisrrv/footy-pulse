import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { addLineId } from "@/utils/supabase/requests";
import LineButton from "./LineButton";

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

  const showLinePopup = (user: any) => {

  }

  const onAddLineIdClick = async (lineId: any) => {
    "use server";

    if (!user) return;
    const added = await addLineId(user.id, lineId);
    if (added) {
      redirect("/protected");
    } else {
      alert("Couldn't add line user ID. Try again.")
    }
  };

  return user ? (
    <div className="flex items-center gap-2">
      <div className="flex flex-row align-center gap-2">
        <p className="hidden sm:block pt-1">Hey, {user.email}!</p>
        <span><LineButton user={user} /></span>
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
