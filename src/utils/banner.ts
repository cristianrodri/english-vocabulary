export const bannerUrl = (banner: string) =>
  /other-vocabulary|lesson/.test(banner)
    ? `${banner.slice(0, banner.lastIndexOf('-'))}.webp`
    : `${banner}.jpg`
