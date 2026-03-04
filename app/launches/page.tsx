type LaunchShort = {
    id: string;
    name: string;
    net: string;
  };
  
  export default async function LaunchesPage() {
    let launches: LaunchShort[] = [];
    try {
      const res = await fetch(
        'https://ll.thespacedevs.com/2.2.0/launch/upcoming?search=SpaceX&limit=7',
        { next: { revalidate: 60 } }
      );
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      launches = (data.results || []) as LaunchShort[];
    } catch (error) {
      console.error("Failed to fetch launches:", error);
    }
  
    return (
      <div className="flex flex-col items-center text-white p-6">
        {/* Titre principal */}
        <h1 className="text-5xl font-bold text-center mb-8 tracking-wide drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]">
          Prochains lancements SpaceX
        </h1>
  
        {/* Si aucun lancement trouvé */}
        {launches.length === 0 && (
          <p className="text-center text-red-400">Aucun lancement à venir trouvé.</p>
        )}
  
        {/* Liste des lancements */}
        <ul className="space-y-6 w-full max-w-4xl">
          {launches.map((launch) => (
            <li
              key={launch.id}
              className="bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg hover:shadow-xl border border-gray-700 hover:border-cyan-400 transition"
            >
              <h2 className="text-2xl font-bold text-gray-200 mb-2">{launch.name}</h2>
              <p className="text-gray-400">
                Date :{' '}
                <span className="text-white">
                  {new Date(launch.net).toLocaleString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  