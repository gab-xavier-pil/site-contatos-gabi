import React from 'react';
import { InstagramIcon, MailIcon, WhatsAppIcon } from './Topbar.jsx';
import './footer.css';

const developerUrl = 'https://www.mateusbonette.com.br';

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 12h15m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 1 1 13 0c0 5.2-6.5 11-6.5 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5V12l3 1.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldCheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3 5 6v6c0 4.5 3 8.3 7 9.5 4-1.2 7-5 7-9.5V6l-7-3Zm-2.5 9 1.8 1.8 3.7-3.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function selectServiceTab(index) {
  const tab = document.getElementById(`service-tab-${index}`);
  if (tab) tab.click();
}

export default function Footer({ whatsapp, email, phone, instagram, maps, wordmark }) {
  return (
    <footer className="site-footer" id="contato" itemScope itemType="https://schema.org/MedicalClinic">
      <meta itemProp="url" content="https://www.gabixavier.net.br/" />
      <meta itemProp="image" content="https://www.gabixavier.net.br/images/social.jpg" />

      <div className="footer-main">
        <div className="footer-brand">
          {wordmark}
          <p className="footer-description" itemProp="description">
            Estúdio de Pilates em aparelhos, fisioterapia e Recovery GX no bairro São Vicente, em
            Itajubá – MG. Cuidado presencial especializado no alívio de dores, reabilitação e
            fortalecimento no seu ritmo.
          </p>
          <div className="footer-socials" aria-label="Redes sociais e contato direto">
            <a
              className="footer-social-btn"
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram oficial do Studio GX (@pilatesgabixavier)"
              itemProp="sameAs"
            >
              <InstagramIcon />
            </a>
            <a
              className="footer-social-btn"
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar aula pelo WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            <a
              className="footer-social-btn"
              href={`mailto:${email}`}
              aria-label={`Enviar e-mail para ${email}`}
            >
              <MailIcon />
            </a>
          </div>
        </div>

        <nav className="footer-nav" aria-label="Navegação do rodapé">
          <h2 className="footer-heading">Navegação</h2>
          <ul className="footer-nav-list">
            <li>
              <a href="#inicio">Início</a>
            </li>
            <li>
              <a href="#espaco">O Estúdio</a>
            </li>
            <li>
              <a href="#cuidados" onClick={() => selectServiceTab(0)}>
                Pilates em Aparelhos
              </a>
            </li>
            <li>
              <a href="#cuidados" onClick={() => selectServiceTab(1)}>
                Fisioterapia
              </a>
            </li>
            <li>
              <a href="#cuidados" onClick={() => selectServiceTab(2)}>
                Recovery GX
              </a>
            </li>
            <li>
              <a href="#diferenciais">Diferenciais</a>
            </li>
            <li>
              <a href="#gabi">Conheça a Gabi</a>
            </li>
            <li>
              <a href="#pilates-online">Pilates Online · 8 GX</a>
            </li>
          </ul>
        </nav>

        <div className="footer-contact-col">
          <h2 className="footer-heading">Contato</h2>
          <address className="footer-contact-address">
            <ul className="footer-info-list">
              <li
                className="footer-info-item"
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <a
                  className="footer-info-link"
                  href={maps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="footer-icon-circle" aria-hidden="true">
                    <MapPinIcon />
                  </span>
                  <span className="footer-info-text">
                    <strong itemProp="streetAddress">Rua Eduardo Piquet, 78 · São Vicente</strong>
                    <span className="footer-info-sub">
                      <span>
                        <span itemProp="addressLocality">Itajubá</span> –{' '}
                        <span itemProp="addressRegion">MG</span> · Como chegar
                      </span>
                      <ArrowIcon />
                    </span>
                  </span>
                </a>
              </li>

              <li className="footer-info-item">
                <div className="footer-info-row">
                  <span className="footer-icon-circle" aria-hidden="true">
                    <ClockIcon />
                  </span>
                  <span className="footer-info-text">
                    <strong>Seg–Qui: 7h às 20h</strong>
                    <span className="footer-info-sub">Sex: 7h–10h e 16h–19h · Sáb: 8h às 10h</span>
                  </span>
                </div>
              </li>

              <li className="footer-info-item">
                <a
                  className="footer-info-link"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="footer-icon-circle" aria-hidden="true">
                    <WhatsAppIcon />
                  </span>
                  <span className="footer-info-text">
                    <strong itemProp="telephone">{phone}</strong>
                    <span className="footer-info-sub">Agendamento pelo WhatsApp</span>
                  </span>
                </a>
              </li>

              <li className="footer-info-item">
                <a className="footer-info-link" href={`mailto:${email}`}>
                  <span className="footer-icon-circle" aria-hidden="true">
                    <MailIcon />
                  </span>
                  <span className="footer-info-text">
                    <strong itemProp="email">{email}</strong>
                    <span className="footer-info-sub">Atendimento por e-mail</span>
                  </span>
                </a>
              </li>

              <li className="footer-info-item">
                <div className="footer-info-row">
                  <span className="footer-icon-circle" aria-hidden="true">
                    <ShieldCheckIcon />
                  </span>
                  <span className="footer-info-text">
                    <strong>Particular, Convênios e Parcerias</strong>
                    <span className="footer-info-sub">
                      Unimed, SulAmérica, CASSI, Caixa, FuSEx, SPA, Wellhub e TotalPass
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()}{' '}
            <span itemProp="name">Studio GX · Gabi Xavier Fisioterapia e Pilates</span>. Todos os
            direitos reservados.
          </p>
          <a
            className="footer-dev-link"
            href={developerUrl}
            target="_blank"
            rel="noopener"
            aria-label="Desenvolvido por Mateus Bonette — conhecer o site www.mateusbonette.com.br"
          >
            Desenvolvido por <strong>Mateus Bonette</strong>
          </a>
        </div>
      </div>
    </footer>
  );
}
