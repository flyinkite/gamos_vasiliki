import informationStyle from "./Information.module.css";

export const Information = () => {
  return (
    <div className={informationStyle.wrapper}>
      <div className={informationStyle.div}>
        <p className={informationStyle.text}>
          Τοποθεσία:
        </p>
        <p className={informationStyle.text}>
          Ιερός ναός Αγίων Κωνσταντίνου και Ελένης
        </p>
        <p className={informationStyle.text}>
          Κτήμα Ιβέλια, Λαμπτρών, Κρωπία, 16672
        </p>
        <p className={informationStyle.text}>
          Οι οικογένειες:
        </p>
        <p className={informationStyle.text}>
          Ήρας και Ξενοφώντα Λαμπράκη
        </p>
        <p className={informationStyle.text}>
          Κυριακούλας και Ευάγγελου Κούρτη
        </p>
        <p className={informationStyle.text}>
          Οι κουμπάροι:
        </p>
        <p className={informationStyle.text}>
          Βέρα Τριανταφυλλίδη
        </p>
        <p className={informationStyle.text}>
          Γιάννης Παπαντωνάκης
        </p>
        <p className={informationStyle.text}>
          Μετά την τελετή, σας περιμένουμε να γιορτάσουμε στον χωρό του κτήματος.
          Παρακαλούμε ενημερώστε μας για την παρουσία σας έως 10/07/26 με την παρακάτω
          φόρμα ή στα τηλέφωνα:
        </p>
        <p className={informationStyle.text}>
          Βασιλική: 6973941825
          Στάθης: 6942661719
        </p>
      </div>
    </div>
  );
};
