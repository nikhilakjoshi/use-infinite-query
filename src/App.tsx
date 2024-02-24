import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Cards from "./components/Cards";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col w-screen">
        <nav className="bg-sky-400 p-4 text-white flex items-center gap-4 fixed w-screen top-0 left-0 z-50">
          <h1 className="font-semibold">
            <pre>@tanstack/react-query</pre>
          </h1>
          <h1 className="text-2xl font-semibold">useInfiniteQuery</h1>
        </nav>
        <Cards />
      </div>
    </QueryClientProvider>
  );
}

export default App;
