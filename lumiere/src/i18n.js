import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      header: {
        home: "Home",
        shop: "Shop",
        collections: "Collections",
        journal: "Journal",
        about: "About",
        contact: "Contact",
        search: "SEARCH",
        wishlist: "Wishlist",
        account: "Account"
      },
      home: {
        timeless: "TIMELESS ELEGANCE",
        hero_title: "Jewellery for Life's\nMost Beautiful\nMoments",
        hero_subtitle: "Exquisite designs. Authentic gemstones. Lasting value.",
        explore: "EXPLORE COLLECTIONS",
        featured: "Featured Collection",
        featured_sub: "Discover 'The Lumière'. Our most loved moments.",
        view_all: "View all",
        art: "The Art of Fine Jewellery",
        discover: "Discover Our Collections"
      },
      footer: {
        join: "Join the Lumière world",
        subscribe_text: "Subscribe to receive updates, access to exclusive deals, and more.",
        placeholder: "Enter your email address",
        success: "Thank you for subscribing!",
        shop: "Shop",
        about: "About",
        customer_care: "Customer Care",
        legal: "Legal",
        rights: "© 2025 Lumière. All rights reserved."
      },
      nav: {
        "Rings": "Rings",
        "Necklaces": "Necklaces",
        "Earrings": "Earrings",
        "Bracelets": "Bracelets",
        "New Arrivals": "New Arrivals",
        "Best Sellers": "Best Sellers",
        "Our Story": "Our Story",
        "Craftsmanship": "Craftsmanship",
        "Materials": "Materials",
        "Careers": "Careers",
        "Contact Us": "Contact Us",
        "Shipping & Returns": "Shipping & Returns",
        "Track Order": "Track Order",
        "FAQs": "FAQs",
        "Ring Size Guide": "Ring Size Guide",
        "Privacy Policy": "Privacy Policy",
        "Terms of Service": "Terms of Service",
        "Cookie Policy": "Cookie Policy"
      }
    }
  },
  uz: {
    translation: {
      header: {
        home: "Bosh sahifa",
        shop: "Do'kon",
        collections: "Kolleksiyalar",
        journal: "Jurnal",
        about: "Biz haqimizda",
        contact: "Aloqa",
        search: "QIDIRUV",
        wishlist: "Sevimlilar",
        account: "Hisob"
      },
      home: {
        timeless: "ZAMONAVIY NAFOSAT",
        hero_title: "Hayotingizning\nEng Go'zal Lahzalari\nUchun",
        hero_subtitle: "Takrorlanmas dizayn. Haqiqiy toshlar. Mangu qiymat.",
        explore: "KOLLEKSIYALARNI KO'RISH",
        featured: "Asosiy Kolleksiya",
        featured_sub: "Lumière bilan kashf eting. Bizning eng sevimli lahzalarimiz.",
        view_all: "Barchasini ko'rish",
        art: "Nafis Zargarlik San'ati",
        discover: "Kolleksiyalarimiz bilan tanishing"
      },
      footer: {
        join: "Lumière dunyosiga qo'shiling",
        subscribe_text: "Yangiliklar va maxsus chegirmalardan xabardor bo'lish uchun obuna bo'ling.",
        placeholder: "Elektron manzilingizni kiriting",
        success: "Obuna bo'lganingiz uchun tashakkur!",
        shop: "Do'kon",
        about: "Biz haqimizda",
        customer_care: "Mijozlarni qo'llab-quvvatlash",
        legal: "Huquqiy",
        rights: "© 2025 Lumière. Barcha huquqlar himoyalangan."
      },
      nav: {
        "Rings": "Uzuklar",
        "Necklaces": "Marjonlar",
        "Earrings": "Sirg'alar",
        "Bracelets": "Bilaguzuklar",
        "New Arrivals": "Yangi kelganlar",
        "Best Sellers": "Eng ko'p sotilganlar",
        "Our Story": "Bizning hikoyamiz",
        "Craftsmanship": "Hunarmandchilik",
        "Materials": "Materiallar",
        "Careers": "Karyera",
        "Contact Us": "Biz bilan bog'lanish",
        "Shipping & Returns": "Yetkazib berish va qaytarish",
        "Track Order": "Buyurtmani kuzatish",
        "FAQs": "Ko'p so'raladigan savollar",
        "Ring Size Guide": "Uzuk o'lchamlari",
        "Privacy Policy": "Maxfiylik siyosati",
        "Terms of Service": "Xizmat ko'rsatish shartlari",
        "Cookie Policy": "Kuki siyosati"
      }
    }
  },
  ru: {
    translation: {
      header: {
        home: "Главная",
        shop: "Магазин",
        collections: "Коллекции",
        journal: "Журнал",
        about: "О нас",
        contact: "Контакты",
        search: "ПОИСК",
        wishlist: "Избранное",
        account: "Аккаунт"
      },
      home: {
        timeless: "ВНЕВРЕМЕННАЯ ЭЛЕГАНТНОСТЬ",
        hero_title: "Ювелирные изделия\nДля Самых Красивых\nМоментов Жизни",
        hero_subtitle: "Изысканный дизайн. Подлинные драгоценные камни. Вечная ценность.",
        explore: "ПОСМОТРЕТЬ КОЛЛЕКЦИИ",
        featured: "Избранная Коллекция",
        featured_sub: "Откройте для себя Lumière. Наши самые любимые моменты.",
        view_all: "Смотреть все",
        art: "Искусство Высокого Ювелирного Дела",
        discover: "Откройте наши коллекции"
      },
      footer: {
        join: "Присоединяйтесь к миру Lumière",
        subscribe_text: "Подпишитесь, чтобы получать новости и эксклюзивные предложения.",
        placeholder: "Введите ваш email",
        success: "Спасибо за подписку!",
        shop: "Магазин",
        about: "О нас",
        customer_care: "Поддержка клиентов",
        legal: "Правовая информация",
        rights: "© 2025 Lumière. Все права защищены."
      },
      nav: {
        "Rings": "Кольца",
        "Necklaces": "Ожерелья",
        "Earrings": "Серьги",
        "Bracelets": "Браслеты",
        "New Arrivals": "Новинки",
        "Best Sellers": "Хиты продаж",
        "Our Story": "Наша история",
        "Craftsmanship": "Мастерство",
        "Materials": "Материалы",
        "Careers": "Карьера",
        "Contact Us": "Связаться с нами",
        "Shipping & Returns": "Доставка и возврат",
        "Track Order": "Отследить заказ",
        "FAQs": "Частые вопросы",
        "Ring Size Guide": "Размеры колец",
        "Privacy Policy": "Политика конфиденциальности",
        "Terms of Service": "Условия использования",
        "Cookie Policy": "Политика Cookie"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    }
  });

export default i18n;
