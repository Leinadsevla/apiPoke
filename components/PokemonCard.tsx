import Link from 'next/link';
import styles from './PokemonCard.module.css';

interface PokemonCardProps {
  name: string;
  url: string;
}

const formatId = (id: number) => {
  return `#${id.toString().padStart(3, '0')}`;
};

export default async function PokemonCard({ name, url }: PokemonCardProps) {
  const res = await fetch(url);
  
  if (!res.ok) {
    return <div className={styles.cardError}>Error loading {name}</div>;
  }
  
  const data = await res.json();
  const id = data.id;
  const types = data.types.map((typeInfo: any) => typeInfo.type.name);
  const image = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;

  return (
    <Link href={`/pokemon/${id}`} className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.cardHeader}>
          <span className={styles.pokemonId}>{formatId(id)}</span>
          <h2 className={styles.pokemonName}>{name}</h2>
        </div>
        
        <div className={styles.imageContainer}>
          <img 
            src={image} 
            alt={name} 
            className={styles.pokemonImage}
            loading="lazy"
          />
        </div>
        
        <div className={styles.typesContainer}>
          {types.map((type: string) => (
            <span key={type} className={`typeBadge ${type}`}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
