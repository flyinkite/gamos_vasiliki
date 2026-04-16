import informationStyle from "./Information.module.css";

export const Information = () => {
  return (
    <div className={informationStyle.background}>
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
            <div className={informationStyle.mapWrapper}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9525.006695785618!2d23.815438417986066!3d37.85239379594626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a195c85702110d%3A0xc680882761eb29bb!2zzprPhM6uzrzOsSDOmc6yzq3Ou865zrEgzprPhM6uzrzOsSDPg8-Ezr8gzprOv8-Bz4nPgM6v!5e1!3m2!1sel!2sgr!4v1776360841084!5m2!1sel!2sgr"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "12px" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a
              href="https://maps.app.goo.gl/zBgHE2BxjqGvmLSN9"
              target="_blank"
              rel="noopener noreferrer"
              className={informationStyle.mapButton}
            >
              Άνοιγμα στους Χάρτες
            </a>
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
    </div>
  );
};