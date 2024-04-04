
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.home__inner}>
          <h3 className={styles.text}>Вітаю!</h3>
          <p className={styles.desc}>
            Це хімічні слоти. Ви можете авторизуватися, натиснувши на кнопку "Вхід | Реєстрація" в лівому верхньому куті. Для гри перейдіть до вкладки "Слоти", а для того щоб отримати додаткові спіни, ви повинні розчинити солі у вкладці "Розтворювач". При грі в слоти ви можете як виграти, так і програти. Щоб мінімізувати втрату при програші скористайтеся знаннями хімії. У вас є шанс отримати свій спін назад, якщо визаміните індекси в формули на правильні. Бажаю успіху ;) 
          </p>
        </div>
      </div>
    </main>
  );
}
