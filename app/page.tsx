import PokemonCard from '../components/PokemonCard';
import Pagination from '../components/Pagination';
import styles from './page.module.css';
import { Suspense } from 'react';
import Loading from '../components/Loading';

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const offset = typeof resolvedSearchParams.offset === 'string' ? parseInt(resolvedSearchParams.offset, 10) : 0;
  const limit = 20;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    return <main className={styles.main}>Failed to load Pokémon</main>;
  }

  const data = await res.json();
  const results = data.results;

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h2>Bem-vindo à Poke<span>Explorer</span></h2>
        <p>Explore o vasto mundo dos Pokémon, suas estatísticas, tipos e muito mais!</p>
      </div>

      <Suspense fallback={<Loading />}>
        <div className={styles.grid}>
          {results.map((pokemon: any) => (
            <PokemonCard 
              key={pokemon.name} 
              name={pokemon.name} 
              url={pokemon.url} 
            />
          ))}
        </div>
      </Suspense>

      <Pagination offset={offset} limit={limit} total={data.count || 1302} />
    </div>
  );
}
