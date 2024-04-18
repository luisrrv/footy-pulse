// import FootyPulseLogo from "./FootyPulseLogo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        {/* TODO: add FootyPulseLogo component */}
        {/* <FootyPulseLogo /> */}
        <p className="text-4xl font-extrabold tracking-tighter bg-lime-500 rounded-lg text-black px-3 py-1">FootyPulse</p>
      </div>
      <div>
        <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center mb-2">
          Get updates and stats of your favorite football players.
        </p>
        <p className="text-sm lg:text-sm font-extralight tracking-wider opacity-80 !leading-tight mx-auto max-w-xl text-center">
          Stay informed with pulse messages showcasing the latest stats, news, and/or insights, all in one place.
        </p>
      </div>
      {/* {TODO: image here of a phone showing how a pulse message with stats of your favorite palyer(s) would look like } */}
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
