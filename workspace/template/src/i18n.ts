import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: 'Hello',
        greeting: 'Welcome!',
      },
    },
    pt: {
      translation: {
        titleheader: 'Moniteze seu servidor de FiveM agora mesmo!',
        descriptionheader: 'A FiveMarket chegou pra acabar com as vendas manuais dos produtos do seu servidor! Conheça a nossa plataforma agora mesmo com a nossa avaliação gratuita. Entregas em tempo real, sem taxas extras e instalação sem pagamento adicional.',
      },
    },
  },
  lng: 'pt-br', // Defina o idioma padrão
  fallbackLng: 'en', // Caso o idioma solicitado não esteja disponível, use o idioma padrão
  interpolation: {
    escapeValue: false, // Permite o uso de HTML em suas traduções
  },
});

export default i18n;
