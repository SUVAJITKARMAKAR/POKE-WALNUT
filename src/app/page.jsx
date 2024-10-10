/* eslint-disable react/jsx-filename-extension */
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-2 items-center justify-center">
        <Image
          src="/images/codewalnut-logo.svg"
          alt="CodeWalnut logo"
          width={180}
          height={38}
          priority
        />

        <h1 className="text-4xl font-bold mt-6">Tech Test</h1>
        <h2 className="text-lg">Good luck!</h2>
      </main>
    </div>
  );
}
