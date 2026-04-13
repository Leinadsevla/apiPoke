import Link from 'next/link';
import styles from './Pagination.module.css';

interface PaginationProps {
  offset: number;
  limit: number;
  total: number;
}

export default function Pagination({ offset, limit, total }: PaginationProps) {
  const prevOffset = Math.max(0, offset - limit);
  const nextOffset = offset + limit;
  const hasPrev = offset > 0;
  const hasNext = nextOffset < total;

  return (
    <div className={styles.pagination}>
      {hasPrev ? (
        <Link href={`/?offset=${prevOffset}`} className={styles.button}>
          &laquo; Anterior
        </Link>
      ) : (
        <button className={styles.buttonDisabled} disabled>
          &laquo; Anterior
        </button>
      )}

      <span className={styles.pageInfo}>
        Mostrando {offset + 1} - {Math.min(offset + limit, total)} de {total}
      </span>

      {hasNext ? (
        <Link href={`/?offset=${nextOffset}`} className={styles.button}>
          Próximo &raquo;
        </Link>
      ) : (
        <button className={styles.buttonDisabled} disabled>
          Próximo &raquo;
        </button>
      )}
    </div>
  );
}
