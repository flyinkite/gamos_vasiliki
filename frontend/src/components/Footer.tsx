import footerStyle from "./Footer.module.css";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className={footerStyle.footer}>
      <div className={footerStyle.container}>
        
        {/* Names */}
        <div className={footerStyle.names}>
          <span>{t("footer.name1")}</span>
          <span className={footerStyle.and}>&</span>
          <span>{t("footer.name2")}</span>
        </div>

        {/* Decorative line */}
        <div className={footerStyle.divider}></div>

      </div>
    </footer>
  );
};