import { Background } from "@/components/landing/layout/background";
import { FloatingNavbar } from "@/components/landing/layout/floating-navbar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  component: WelcomeLayout,
});

function WelcomeLayout() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <main>
        <div className="site-frame site-frame--top" aria-hidden="true" />
        <div className="site-frame site-frame--left" aria-hidden="true" />
        <div className="site-frame site-frame--right" aria-hidden="true" />
        <svg
          className="site-corner site-corner--top-left"
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
            fill="currentColor"
          />
        </svg>
        <svg
          className="site-corner site-corner--top-right"
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
            fill="currentColor"
          />
        </svg>
        <FloatingNavbar />
        <Outlet />
      </main>
    </div>
  );
}
