import Image from "next/image";

export default function Home() {
  return (
    <main className="verification-screen">
      <Image
        src="/brand/automatizza-logo.png"
        alt="Automatizza"
        width={1909}
        height={280}
        priority
      />
      <p>Automatizza Web — rebuild</p>
    </main>
  );
}
