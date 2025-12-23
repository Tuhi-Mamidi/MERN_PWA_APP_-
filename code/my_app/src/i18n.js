import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import en from './locals/en/translation.json'
import te from './locals/te/translation.json'
i18n.use(initReactI18next).init({
    resources:{
        en:{translation:en},
        te:{translation:te}

    },
    fallbackLng:'te',
    interpolation:{
        escapeValue:false
    }
})

export default i18n;