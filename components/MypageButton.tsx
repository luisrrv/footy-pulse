"use client";

interface Props {
  redirectPage: Function;
}

export default function MypageButton({redirectPage}: Props) {
  return (
    <button
      className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
      onClick={() => (redirectPage())}
    >
      My page
    </button>
  );
}
