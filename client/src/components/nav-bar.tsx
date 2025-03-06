import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const [location] = useLocation();

  return (
    <nav className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Solar System Explorer
            </a>
          </Link>
          
          <div className="flex gap-6">
            <Link href="/">
              <a className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location === "/" && "text-primary"
              )}>
                Planets
              </a>
            </Link>
            <Link href="/quiz">
              <a className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location === "/quiz" && "text-primary"
              )}>
                Quiz
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
