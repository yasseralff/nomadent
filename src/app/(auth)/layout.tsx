/**
 * Shared layout for all (auth) routes: /login and /register.
 * Centers content on the full-screen dark canvas.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      {children}
    </div>
  );
}
