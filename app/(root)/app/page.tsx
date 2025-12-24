import AllRooms from "@/components/home/all-rooms";
import Options from "@/components/home/options";
import { Suspense } from "react";

export default function Home() {

  return (
    <main className="custom-container">
      <Options />
      <Suspense fallback={<p>Loading rooms...</p>}>
        <AllRooms />
      </Suspense>
    </main>
  );
}
