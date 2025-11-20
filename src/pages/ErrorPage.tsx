import { isRouteErrorResponse, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const status = error?.status || 500;
    const statusText = error?.statusText || "Unexpected Error";
    const message = error?.data || "Something went wrong.";
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-lg space-y-6 rounded-2xl bg-white p-10 text-center shadow-xl">
          <div className="text-6xl font-bold text-red-500">{status}</div>
          <h1 className="text-2xl font-semibold text-gray-800">{statusText}</h1>
          <p className="text-gray-600">{message}</p>

          <a
            href="/"
            className="mt-4 inline-block rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }
};

export default ErrorPage;
