import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import Image from 'next/image';
import mobile from '@/app/public/mobile_msg.png';
import pc from '@/app/public/app_choose.png';
import { ArrowRightIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
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
        <div className="flex flex-col lg:flex-row justify-center align-center w-full">
          <div className="flex flex-col">
            <p className="w-full text-center font-extrabold tracking-tighter text-3xl">Follow your favorite players</p>
            <Image className="block self-center m-2 w-full lg:w-[400px] xl:w-[600px] lg:mt-[140px]" src={pc.src} alt="Desktop app palyer choose example" width={300} height={200} />
          </div>
          <ArrowRightIcon className="hidden lg:block w-6 h-6 self-center" />
          <ArrowDownIcon className="lg:hidden w-6 h-6 self-center mt-8" />
          <div className="flex flex-col">
            <p className="w-full text-center font-extrabold tracking-tighter text-3xl mt-12 lg:mt-0 mb-6">Get daily updates on players stats</p>
            <Image className="block self-center m-2" src={mobile.src} alt="Mobile discord message example" width={300} height={300} />
          </div>
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
