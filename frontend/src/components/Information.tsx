import informationStyle from "./Information.module.css";

export const Information = () => {
  return (
    <div className={informationStyle.wrapper}>
      <div className={informationStyle.card}>

        {/* Location */}
        <div className={informationStyle.section}>
          <h2 className={informationStyle.title}>Τοποθεσία</h2>
          <p className={informationStyle.text}>
            Ιερός ναός Αγίων Κωνσταντίνου και Ελένης
          </p>
          <p className={informationStyle.text}>
            Κτήμα Ιβέλια, Λαμπτρών, Κρωπία, 16672
          </p>

          {/* Image */}
          <img
            src="/ivelia.jpg"
            alt="Τοποθεσία γάμου"
            className={informationStyle.image}
          />
        </div>

        {/* Families */}
        <div className={informationStyle.section}>
          <h2 className={informationStyle.title}>Οι οικογένειες</h2>
          <p className={informationStyle.text}>
            Ήρας και Ξενοφώντα Λαμπράκη
          </p>
          <p className={informationStyle.text}>
            Κυριακούλας και Ευάγγελου Κούρτη
          </p>
        </div>

        {/* Koumbaroi */}
        <div className={informationStyle.section}>
          <h2 className={informationStyle.title}>Οι κουμπάροι</h2>
          <p className={informationStyle.text}>
            Βέρα Τριανταφυλλίδη
          </p>
          <p className={informationStyle.text}>
            Γιάννης Παπαντωνάκης
          </p>
        </div>

        {/* Info */}
        <div className={informationStyle.section}>
          <p className={informationStyle.text}>
            Μετά την τελετή, σας περιμένουμε να γιορτάσουμε στον χώρο του κτήματος.
            Παρακαλούμε ενημερώστε μας για την παρουσία σας έως 10/07/26 με την παρακάτω
            φόρμα ή στα τηλέφωνα:
          </p>
        </div>

        {/* Phones */}
        <div className={informationStyle.section}>
          <p className={informationStyle.text}>
            Βασιλική: 6973941825
          </p>
          <p className={informationStyle.text}>
            Στάθης: 6942661719
          </p>
        </div>

      </div>
    </div>
  );
};