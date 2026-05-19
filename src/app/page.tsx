import { HomePage } from "@/components/home-page";
import { getAllRooms } from "@/lib/rooms-repository";

export default async function Home() {
  const rooms = await getAllRooms();
  return <HomePage rooms={rooms} />;
}
