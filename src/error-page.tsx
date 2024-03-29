import { useRouteError } from "react-router-dom";
import { Rat } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  let errorMessage = "An unknown error occurred";
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (
    typeof error === "object" &&
    error !== null &&
    "statusText" in error
  ) {
    errorMessage = (error as { statusText: string }).statusText;
  }

  return (
    <div className="flex min-h-[100vh] w-full flex-col items-center justify-center">
      <div>
        <h1 className="mb-4 text-5xl">404</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{errorMessage}</i>
        </p>
        <Rat className="fixed bottom-4 right-4 h-5 w-5" />
      </div>
    </div>
  );
}
