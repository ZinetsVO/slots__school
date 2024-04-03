
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.home__inner}>
          <h3 className={styles.text}>Вітаю!</h3>
          <p className={styles.desc}>
            Це хімічні слоти. Ви можете авторизуватися, натиснувши на кнопку "Увійти" в лівому верхньому куті. Для гри перейдіть до вкладки "Слоти", а для того щоб отримати додаткові спіни, ви повинні розчинити солі у вкладці "Розтворювач"
          </p>
        </div>
      </div>
    </main>
  );
}
