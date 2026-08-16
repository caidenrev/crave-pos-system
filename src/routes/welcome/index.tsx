import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-7xl w-full min-h-screen">
      <section className="relative w-full">
        <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
          <div className="flex flex-col items-center gap-8 md:flex-row items-center justify-between">
            <div className="flex flex-col gap-5 text-center md:text-left">
              <p className="text-[20px] leading-tight tracking-tight font-medium text-foreground">
                Hi
                <span aria-hidden="true" className="mx-0.5">
                  👋
                </span>
                , I&rsquo;m Kevin
              </p>

              <h1 className="text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[2.5rem] lg:text-[3.65rem]">
                <span className="block whitespace-nowrap"> Student &</span>
                <span className="block whitespace-nowrap">Software Engineer</span>
              </h1>

              <p className="max-w-[34ch] text-[22px] leading-[1.4] tracking-tight text-foreground/65">
                Informatics student who is passionate about building technological solutions that
                make a real impact.
              </p>
              <div className="mt-6 flex items-center justify-center md:justify-start">
                <Button>hahaha</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
