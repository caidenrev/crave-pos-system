import { useEffect } from "react";
import { useRouterState, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/useAuth";
import { Loader2 } from "lucide-react";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { session, loading, isUnlocked } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading) {
      const isAuthRoute = pathname === "/login" || pathname === "/pin";
      
      if (!session && pathname !== "/login") {
        // Not logged in -> force login
        navigate({ to: "/login" });
      } else if (session && !isUnlocked && pathname !== "/pin") {
        // Logged in but not unlocked -> force PIN
        navigate({ to: "/pin" });
      } else if (session && isUnlocked && isAuthRoute) {
        // Fully authenticated and on an auth route -> go home
        navigate({ to: "/" });
      }
    }
  }, [session, loading, isUnlocked, pathname, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  // Prevent rendering children if we're supposed to be redirecting
  if (!session && pathname !== "/login") return null;
  if (session && !isUnlocked && pathname !== "/pin") return null;

  return <>{children}</>;
}
