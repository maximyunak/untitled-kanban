import type {AccordionItem} from "@nuxt/ui";


export const useFaqItems = () => {
  const {t} = useI18n()

  return [
    {
      label: t('landing.faq.newApp.q'),
      content: t('landing.faq.newApp.a')
    },
    {
      label: t('landing.faq.secure.q'),
      content: t('landing.faq.secure.a')
    },
    {
      label: t('landing.faq.api.q'),
      content: t('landing.faq.api.a')
    },
    {
      label: t('landing.faq.team.q'),
      content: t('landing.faq.team.a')
    }
  ] as const satisfies AccordionItem[]

}


