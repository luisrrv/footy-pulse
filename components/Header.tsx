import SupabaseLogo from "./SupabaseLogo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        {/* TODO: Replace SupabaseLogo with  FootyPulseLogo */}
        <SupabaseLogo /> 
      </div>
      {/* <h1 className="sr-only">Supabase and Next.js Starter Template</h1> */}
      <div>
        <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center mb-2">
          Get updates and stats of your favorite football players.
        </p>
        <p className="text-xs lg:text-xs tracking-wider opacity-80 !leading-tight mx-auto max-w-xl text-center">
          Stay informed with pulse messages showcasing the latest stats, news, and/or insights, all in one place.
        </p>
      </div>
      {/* {TODO: image here of a phone showing how a pulse message with stats of your favorite palyer(s) would look like } */}
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
