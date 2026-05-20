import { HomePage } from "@/components/home-page";
import { getSession } from "@/lib/auth";
import { getAllRooms } from "@/lib/rooms-repository";

type Props = {
  searchParams: Promise<{ welcome?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const rooms = await getAllRooms();
  const user = await getSession();
  const { welcome } = await searchParams;
  return (
    <HomePage
      rooms={rooms}
      user={user}
      showWelcome={welcome === "1"}
    />
  );
}
