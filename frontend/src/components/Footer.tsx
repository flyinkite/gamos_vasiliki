import footerStyle from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={footerStyle.footer}>
      <div className={footerStyle.container}>
        
        {/* Names */}
        <div className={footerStyle.names}>
          <span>Βασιλική</span>
          <span className={footerStyle.and}>&</span>
          <span>Στάθης</span>
        </div>

        {/* Decorative line */}
        <div className={footerStyle.divider}></div>

        {/* Optional small text */}
        <p className={footerStyle.note}>
          Με αγάπη σας περιμένουμε
        </p>

      </div>
    </footer>
  );
};