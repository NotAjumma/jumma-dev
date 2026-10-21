import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-grid flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <Image src="/brand/kancil.png" alt="Sang Kancil looking for the page" width={150} height={199} priority />
      <div className="mt-8 font-mono text-sm text-accent">404</div>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
        Even Sang Kancil <span className="font-serif font-normal italic text-gradient">couldn&apos;t find it.</span>
      </h1>
      <p className="mt-4 max-w-md text-muted">This page doesn&apos;t exist. The portfolio does, though.</p>
      <Link href="/" className="mt-8 rounded-full bg-fg px-6 py-3 font-medium text-bg transition hover:opacity-85">
        Back to home
      </Link>
    </main>
  );
}
