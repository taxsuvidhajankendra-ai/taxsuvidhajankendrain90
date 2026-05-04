import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center text-center p-4">
      <div>
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-2 text-muted-foreground">Page not found</p>
        <Link to="/" className="inline-block mt-4 bg-accent text-accent-foreground px-5 py-2 rounded-lg">Go Home</Link>
      </div>
    </div>
  );
}
