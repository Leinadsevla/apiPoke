import Link from 'next/link';
import styles from './page.module.css';

const formatWeight = (w: number) => (w / 10).toFixed(1) + ' kg';
const formatHeight = (h: number) => (h / 10).toFixed(1) + ' m';
const formatId = (id: number) => `#${id.toString().padStart(3, '0')}`;

export default async function PokemonDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    return (
      <div className={styles.errorContainer}>
        <h2>Pokémon não encontrado!</h2>
        <Link href="/" className={styles.backButton}>&laquo; Voltar para Home</Link>
      </div>
    );
  }

  const pokemon = await res.json();
  
  const types = pokemon.types.map((typeInfo: any) => typeInfo.type.name);
  const image = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  const shinyImage = pokemon.sprites.other['official-artwork'].front_shiny || pokemon.sprites.front_shiny;

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.actionNav}>
        <Link href="/" className={styles.backButton}>
          &laquo; Voltar
        </Link>
      </div>

      <div className={styles.detailContainer}>
        <div className={styles.imageColumn}>
          <div className={styles.mainImageWrapper}>
            <div className={styles.bgCircle}></div>
            <img src={image} alt={pokemon.name} className={styles.mainImage} />
          </div>
          
          <div className={styles.types}>
            {types.map((type: string) => (
              <span key={type} className={`typeBadge ${type}`}>
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.infoColumn}>
          <div className={styles.headerTitle}>
            <span className={styles.id}>{formatId(pokemon.id)}</span>
            <h1 className={styles.name}>{pokemon.name}</h1>
          </div>

          <div className={styles.specsGrid}>
            <div className={styles.specBox}>
              <span className={styles.specLabel}>Altura</span>
              <span className={styles.specValue}>{formatHeight(pokemon.height)}</span>
            </div>
            <div className={styles.specBox}>
              <span className={styles.specLabel}>Peso</span>
              <span className={styles.specValue}>{formatWeight(pokemon.weight)}</span>
            </div>
            <div className={styles.specBox}>
              <span className={styles.specLabel}>Habilidades</span>
              <span className={styles.specValue}>
                {pokemon.abilities.map((a: any) => a.ability.name).join(', ')}
              </span>
            </div>
          </div>

          <div className={styles.statsSection}>
            <h3>Estatísticas Base</h3>
            {pokemon.stats.map((statInfo: any) => {
              const statValue = statInfo.base_stat;
              const maxStat = 255;
              const percentage = Math.min(100, (statValue / maxStat) * 100);
              
              return (
                <div key={statInfo.stat.name} className={styles.statRow}>
                  <span className={styles.statName}>{statInfo.stat.name.replace('-', ' ')}</span>
                  <span className={styles.statNumber}>{statValue}</span>
                  <div className={styles.statBarBg}>
                    <div 
                      className={styles.statBarFill} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
