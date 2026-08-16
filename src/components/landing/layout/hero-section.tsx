import { CloudShader } from "@/components/shaders/cloud-shader";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <CloudShader className="absolute inset-0 rounded-b-2xl md:rounded-none" />

      {/* hero */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-20 text-center md:pt-32">
        <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md md:text-6xl lg:text-7xl">
          Power your business <br className="hidden md:block" /> with{" "}
          <span className="text-primary underline underline-offset-8">Crave POS</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base text-white/90 drop-shadow-sm md:text-lg">
          Crave POS helps you manage sales, products, inventory, and daily operations in one simple
          system built for modern businesses.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-sky-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-white/90"
            asChild
          >
            <a href="/login">Get Started</a>
          </Button>

          <Button
            className="rounded-full border border-white/40 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            asChild
          >
            <a href="/features">Explore Features</a>
          </Button>
        </div>

        <p className="mt-4 text-xs text-white/70">
          Simple setup &middot; Built for growing businesses
        </p>
      </div>

      {/* dashboard image */}
      <div className="relative z-10 mx-auto mt-12 w-full max-w-6xl px-4 pb-4 md:mt-16 md:px-8">
        <div className="rounded-2xl border border-white/30 bg-white/20 p-2 shadow-2xl backdrop-blur-md md:rounded-[2rem] md:p-3 [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]">
          <img
            src="/hero.png"
            alt="Crave Dashboard"
            className="
              w-full rounded-xl border border-black/5 shadow-lg
               md:rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
