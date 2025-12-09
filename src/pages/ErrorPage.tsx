import { isRouteErrorResponse, useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();

  let status = 500;
  let title = "Unexpected Error";
  let message: string | null = "Something went wrong.";

  if (isRouteErrorResponse(error)) {
    status = error.status ?? 500;
    title = error.statusText || "Unexpected Error";
    message =
      typeof error.data === "string" ? error.data : error.data?.message || null;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <section className="w-full max-w-lg space-y-6 rounded-2xl bg-white p-10 text-center shadow-xl">
        <div className="text-6xl font-bold text-red-500">{status}</div>
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        {message && <p className="text-gray-600">{message}</p>}

        <a
          href="/"
          className="mt-4 inline-block rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Go Home
        </a>
      </section>
    </main>
  );
}
