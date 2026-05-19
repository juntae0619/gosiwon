import { HomePage } from "@/components/home-page";
import { getAllRooms } from "@/lib/rooms-repository";

export default function Home() {
  const rooms = getAllRooms();
  return <HomePage rooms={rooms} />;
}
