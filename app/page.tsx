import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import Image from 'next/image';
// import QRCode from '@/app/public/bicho_bot_line_qr.png';
// import DeployButton from "../components/DeployButton";
// import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
// import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
          {/* <DeployButton /> */}
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <div className="flex flex-col justify-center align-center w-full">
          {/* <p className="w-full text-center">Follow FootyPulse's LINE Bot to get updates</p> */}
          {/* <Image className="block self-center m-2" src={QRCode.src} alt="Line bot QR Code" width={200} height={200}/> */}
        </div>
        {/* <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </main> */}
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
