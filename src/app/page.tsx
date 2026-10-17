import MoveForm from './components/Forms/MoveForm/MoveForm';
import MoveButton from './components/MoveButton/MoveButton';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <MoveForm />
      </main>
    </div>
  );
}
