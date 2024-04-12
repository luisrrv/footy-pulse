// import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { 
  getFollowed, 
  getPlayers, 
  addPlayerToFollowed, 
  removePlayerFromFollowed, 
  addLineId,
} from "@/utils/supabase/requests";
import PlayerCard from "@/components/PlayerCard";
// import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
// import Header from "@/components/Header";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const onAddClick = async (playerId: any) => {
    "use server";
    const added = await addPlayerToFollowed(user.id, playerId);
    if (added) {
      redirect("/protected");
    } else {
      alert("Couldn't add player to followed. Try again.")
    }
  };
  
  const onRemoveClick = async (playerId: any) => {
    "use server";
    const removed = await removePlayerFromFollowed(user.id, playerId);
    if (removed) {
      redirect("/protected");
    } else {
      alert("Couldn't remove player from followed. Try again.")
    }
  };

  const followed = await getFollowed(user.id);
  let players = [];
  if (!followed || followed.length == 0) {
    players = await getPlayers();
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            {/* <DeployButton /> */}
            <p className="flex flex-row align-center gap-1 text-2xl font-extrabold tracking-tighter">FootyPulse<span className="!text-sm font-extralight pt-[6px]">My page</span></p>
            <AuthButton />
          </div>
        </nav>
        {/* <div className="w-full flex justify-center py-4 font-extrabold bg-indigo-900 tracking-widest	px-4">
          <p className="w-full max-w-4xl flex justify-start items-center text-sm">My page</p>
        </div> */}
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        {/* <Header /> */}
        <main className="flex-1 flex flex-col gap-6">
          {followed && followed.length > 0 ? (
            <>
              <h3 className="font-bold text-xl mb-4 w-full text-center">Followed Players</h3>
              <div className="players-grid flex flex-row justify-center align-center flex-wrap">
                {followed.map(player => <PlayerCard playerData={player} add={false} onAddClick={onAddClick} onRemoveClick={onRemoveClick} />)}
              </div>
            </>
          ) : (
            <>
              <h3 className="font-bold text-xl mb-4 w-full text-center">Choose players to get updates from</h3>
              <div className="players-grid flex flex-row justify-center align-center flex-wrap	">
                {players.map(player => <PlayerCard playerData={player} add={true} onAddClick={onAddClick} onRemoveClick={onRemoveClick} />)}
              </div>
            </>
          )}
          {/* <h2 className="font-bold text-4xl mb-4">Next steps</h2> */}
          {/* <FetchDataSteps /> */}
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          by{" "}
          <a
            href="https://github.com/luisrrv"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            luisrrv
          </a>
        </p>
      </footer>
    </div>
  );
}
