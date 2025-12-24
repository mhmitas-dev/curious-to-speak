import AllRooms from "@/components/home/all-rooms";
import Options from "@/components/home/options";
import { Suspense } from "react";

export default function Home() {

  return (
    <main className="custom-container space-y-10">
      <Options />
      <Suspense fallback={<p>Loading rooms...</p>}>
        <AllRooms />
      </Suspense>
    </main>
  );
}
