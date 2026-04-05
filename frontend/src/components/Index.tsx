import { Link } from "react-router-dom";
import indexStyle from "./Index.module.css";

export const Index = () => {
  return (
    <div className={indexStyle.wrapper}>
      <p className={indexStyle.p_header}>
        Save the date
      </p>
      <p className={indexStyle.date}>Βασιλική <span className={indexStyle.span}>&</span> Στάθης</p>
      <p className={indexStyle.place}>26/09/2026, Ώρα 19:00</p>
      <p className={indexStyle.p}>
        Μαζί γράφουμε το επόμενο κεφάλαιο και θα χαρούμε να είστε μέρος της ιστορίας μας.
      </p>
      <Link className={indexStyle.button} to="/rsvp">
        Φόρμα
      </Link>
      <svg className={indexStyle.svgMain}></svg>
    </div>
  );
};
