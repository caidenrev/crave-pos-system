import ScrollReveal from "@/components/layout/ScrollReveal";
import GridBento from "../ui/grid-bento";

export function AboutSection() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-12 md:py-20">
        <div className="flex max-w-3xl text-start md:text-justify ">
          <ScrollReveal
            baseOpacity={0}
            enableBlur
            baseRotation={0}
            blurStrength={15}
            textClassName="text-[clamp(1.5rem,4vw,3rem)]"
          >
            Less time managing your business. More time growing it. Crave POS gives you everything
            you need to run your business, all in one place.
          </ScrollReveal>
        </div>

        <GridBento
          textAutoHide={true}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={12}
          disableAnimations={false}
        />
      </div>
    </section>
  );
}
