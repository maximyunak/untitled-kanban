export const useCapabilities = () => {
  const { t } = useI18n();

  const capabilitiesKeys = ['secure', 'api', 'mobile', 'tags'] as const;
  const icons = ['🔐', '🔌', '📱', '🏷️'];

  return computed(() =>
    capabilitiesKeys.map((key, index) => ({
      icon: icons[index],
      title: t(`landing.features.capabilities.${key}.title`),
      description: t(`landing.features.capabilities.${key}.desc`)
    }))
  );
}