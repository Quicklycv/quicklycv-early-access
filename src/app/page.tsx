import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Quicklycv</h1>
      <p className="text-lg">Be one of the first to try Quicklycv</p>
      <Image
        src="/quicklycv-logo.svg"
        alt="Quicklycv Logo"
        width={500}
        height={500}
      />
    </main>
  );
}
