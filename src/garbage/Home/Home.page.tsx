import BoardsList from "../../components/BoardsList/BoardsList.component";
import classes from "./Home.module.css";

export default function Home() {
  return (
    <div className={classes.mainContainer}>
      <header>
        <h1 className="text-3xl">Welcome To The Draw Graphics IO </h1>
        <p className="text-center">
          Create your first diagram or select the existing one
        </p>
      </header>
      <main className="flex flex-col gap-4 mt-4 h-100">
        <h3 className="text-center">Boards</h3>
        <BoardsList />
      </main>
      <footer className={`mt-4 ${classes.footer}`}>
        <p>Draw Graphics IO &copy; 2025.</p>
        <p>All rights reserved.</p>
        <p>Made with ❤️ by Draw Graphics IO Team.</p>
        <p>Contact us: tg:@oktarinos </p>
      </footer>
    </div>
  );
}
