import LaunchCountdown from "../components/LaunchCountdown";
import Image from "next/image";

export default async function HomePage() {
  let launches = [];
  try {
    const res = await fetch(
      "https://ll.thespacedevs.com/2.2.0/launch/upcoming?search=SpaceX&limit=2",
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    launches = data.results || [];
  } catch (error) {
    console.error("Failed to fetch launches:", error);
  }
  const nextLaunch = launches[0];
  const upcomingLaunch = launches[1];
  const isLaunched = new Date(nextLaunch?.net).getTime() < Date.now();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center text-gray-100 relative overflow-hidden">
      {/* Titre principal */}
      <div className="relative bg-gray-900 bg-opacity-75 p-4 rounded-md z-10 mb-8">
        <h1 className="text-5xl font-bold text-center tracking-wide drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
          Suivez les prochains lancements de SpaceX
        </h1>
      </div>
      {/* Astronaute */}
      <Image
        src="/astronaut.png"
        alt="Astronaute"
        width={500}
        height={500}
        className="absolute top-[150px] w-[300px] sm:w-[400px] md:w-[500px] h-auto opacity-90 pointer-events-none animate-float"
        style={{ zIndex: 0 }}
        priority 
      />
      {/* Carte dynamique */}
      <div className="relative w-full max-w-md p-6 bg-gray-900 bg-opacity-90 rounded-lg shadow-lg border border-gray-700 backdrop-blur-md z-10">
        {nextLaunch ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-4">
              {isLaunched ? "Lancement terminé" : "Prochain Lancement"}
            </h2>
            <p className="text-center text-gray-400">
              Mission : <span className="text-white">{nextLaunch.name}</span>
            </p>
            <p className="text-center text-gray-400">
              Date :{" "}
              <span className="text-white">
                {new Date(nextLaunch.net).toLocaleString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
            {isLaunched ? (
              <p className="text-center text-green-400 font-bold">
                Statut : {nextLaunch.status?.name || "Inconnu"}
              </p>
            ) : (
              <div className="flex justify-center mt-4">
                <LaunchCountdown dateUtc={nextLaunch.net} />
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-red-400">Aucun lancement trouvé.</p>
        )}

        {/* Prochain lancement si le premier est terminé */}
        {isLaunched && upcomingLaunch && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-center mb-2">
              Prochain lancement
            </h2>
            <p className="text-center text-gray-400">
              Mission :{" "}
              <span className="text-white">{upcomingLaunch.name}</span>
            </p>
            <p className="text-center text-gray-400">
              Date :{" "}
              <span className="text-white">
                {new Date(upcomingLaunch.net).toLocaleString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
            <div className="flex justify-center mt-4">
              <LaunchCountdown dateUtc={upcomingLaunch.net} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
