import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-burgundy border-t border-white/10 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <Link
          href="/"
          className="font-heading text-sm tracking-[0.3em] uppercase"
        >
          Austin
        </Link>
        <p className="font-body text-xs text-white/40">
          &copy; {new Date().getFullYear()} AustinG Jewellery. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="font-body text-xs text-white/60 hover:text-white transition-colors duration-300"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="font-body text-xs text-white/60 hover:text-white transition-colors duration-300"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
