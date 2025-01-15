import { DataContext } from "./services/DataContext";
import Portfolio from "./components/Portfolio";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-2 gap-1 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full text-2xl ">
        Heat Engineer Stock App
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <DataContext>
            <Portfolio/>
        </DataContext>
      </main>
    </div>
  );
}
