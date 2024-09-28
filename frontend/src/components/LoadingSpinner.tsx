import styles from './loadingSpinner.module.scss';

export default function LoadingSpinner() {
  return (
    <div
      className={styles.loadingSpinner}
    >
      <img
        src="/images/loading-icon.png" 
        alt="Loading..."
      />
    </div>
  );
}
