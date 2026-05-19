export const useDemoColumns = () => {
  const { t } = useI18n()

  return [
    {
      id: 1,
      name: t('landing.demo.columns.todo.name'),
      tasks: [
        { id: 1, title: t('landing.demo.columns.todo.tasks.api') },
        { id: 2, title: t('landing.demo.columns.todo.tasks.tests') }
      ]
    },
    {
      id: 2,
      name: t('landing.demo.columns.inProgress.name'),
      tasks: [
        { id: 3, title: t('landing.demo.columns.inProgress.tasks.landing') }
      ]
    },
    {
      id: 3,
      name: t('landing.demo.columns.done.name'),
      tasks: [
        { id: 4, title: t('landing.demo.columns.done.tasks.name') }
      ]
    }
  ] as const
}