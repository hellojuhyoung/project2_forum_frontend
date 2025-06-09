import clsx from "clsx";
import { FooterStyled } from "./styled";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("Margins.footer");
  const currentYear = new Date().getFullYear();

  return (
    <FooterStyled className={clsx("footer-container")}>
      <footer>
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section about">
            <h3>{t("company_name")}</h3>
            <p>{t("company_description")}</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                Facebook
              </a>{" "}
              <a href="#" aria-label="Twitter">
                Twitter
              </a>
              <a href="#" aria-label="LinkedIn">
                LinkedIn
              </a>
              <a href="#" aria-label="Instagram">
                Instagram
              </a>
            </div>
          </div>
          <div className="footer-divider"></div>{" "}
          <div className="footer-section links">
            <h4>{t("section_company")}</h4>
            <ul>
              <li>
                <a href="/about">{t("link_about_us")}</a>
              </li>
              <li>
                <a href="/contact">{t("link_contact")}</a>
              </li>
              <li>
                <a href="/careers">{t("link_careers")}</a>
              </li>
              <li>
                <a href="/blog">{t("link_blog")}</a>
              </li>
            </ul>
          </div>
          <div className="footer-section links">
            <h4>{t("section_support")}</h4>
            <ul>
              <li>
                <a href="/faq">{t("link_faq")}</a>
              </li>
              <li>
                <a href="/help-center">{t("link_help_center")}</a>
              </li>
              <li>
                <a href="/feedback">{t("link_feedback")}</a>
              </li>
            </ul>
          </div>
          <div className="footer-section links">
            <h4>{t("section_legal")}</h4>
            <ul>
              <li>
                <a href="/privacy-policy">{t("link_privacy_policy")}</a>
              </li>
              <li>
                <a href="/terms-of-service">{t("link_terms_of_service")}</a>
              </li>
              <li>
                <a href="/cookie-policy">{t("link_cookie_policy")}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} {t("company_name")}.{" "}
            {t("copyright_all_rights_reserved")}
          </p>
        </div>
      </footer>
    </FooterStyled>
  );
};

export default Footer;
