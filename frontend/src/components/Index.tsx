import { Link } from "react-router-dom";
import indexStyle from "./Index.module.css";
import { useTranslation } from "react-i18next";

export const Index = () => {
  const { t } = useTranslation();

  return (
    <div className={indexStyle.hero}>
      <div className={indexStyle.wrapper}>
        
        <p className={indexStyle.p_header}>
          {t("index.saveTheDate")}
        </p>

        <p className={indexStyle.date}>
          {t("index.name1")} <span>&</span> {t("index.name2")}
        </p>

        <p className={indexStyle.place}>
          {t("index.date")}
        </p>

        <p className={indexStyle.p}>
          {t("index.message")}
        </p>

        <div className={indexStyle.buttonWrapper}>
          <Link className={indexStyle.button} to="/rsvp">
            {t("index.cta")}
          </Link>

          <Link className={indexStyle.button} to="/information">
            {t("index.cta_info")}
          </Link>
        </div>

      </div>
    </div>
  );
};