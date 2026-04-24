import informationStyle from "./Information.module.css";
import { useTranslation } from "react-i18next";

export const Information = () => {
  const { t } = useTranslation();

  return (
    <div className={informationStyle.background}>
      <div className={informationStyle.wrapper}>
        <div className={informationStyle.card}>

          {/* Location */}
          <div className={informationStyle.section}>
            <h2 className={informationStyle.title}>
              {t("information.title_location")}
            </h2>

            <p className={informationStyle.text}>
              {t("information.church")}
            </p>

            <p className={informationStyle.text}>
              {t("information.venue")}
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
              {t("information.open_maps")}
            </a>
          </div>

          {/* Families */}
          <div className={informationStyle.section}>
            <h2 className={informationStyle.title}>
              {t("information.title_families")}
            </h2>

            <p className={informationStyle.text}>
              {t("information.family1")}
            </p>

            <p className={informationStyle.text}>
              {t("information.family2")}
            </p>
          </div>

          {/* Koumbaroi */}
          <div className={informationStyle.section}>
            <h2 className={informationStyle.title}>
              {t("information.title_koumbaroi")}
            </h2>

            <p className={informationStyle.text}>
              {t("information.koumbaros1")}
            </p>

            <p className={informationStyle.text}>
              {t("information.koumbaros2")}
            </p>
          </div>

          {/* Info */}
          <div className={informationStyle.section}>
            <p className={informationStyle.text}>
              {t("information.info_text")}
            </p>
          </div>

          {/* Phones */}
          <div className={informationStyle.section}>
            <p className={informationStyle.text}>
              {t("information.phone1")}
            </p>

            <p className={informationStyle.text}>
              {t("information.phone2")}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};