// Les dates du bilan arrivent en ISO depuis l'API. On les formate en UTC :
// les bornes de semaine sont stockees en @db.Date a minuit UTC, et un rendu
// en heure locale ferait reculer le lundi d'un jour a l'ouest de Greenwich.
const fmt = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
});

const fmtWithYear = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatWeekRange(start: string, end: string): string {
  return `${fmt.format(new Date(start))} – ${fmtWithYear.format(new Date(end))}`;
}

export function weekNumber(slug: string): string {
  const [, week] = slug.split('-w');
  return week ?? slug;
}

// L'accroche complete tient en deux ou trois phrases : sur la page d'accueil
// on n'en garde que le debut, en coupant sur une frontiere de mot pour ne pas
// laisser un mot tronque avant les points de suspension.
export function truncate(text: string, max = 190): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}
