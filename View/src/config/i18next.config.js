import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
const getLang = window.localStorage.getItem('lang')

i18n.use(Backend).use(initReactI18next).init({ fallbackLng: getLang ?? 'en' })