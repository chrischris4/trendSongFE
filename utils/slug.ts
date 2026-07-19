export function slugify(name: string, id: string): string {
  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${slug}-${id}`;
}

export function parseIdFromSlug(slug: string): string {
  const parts = slug.split('-');
  const id = parts[parts.length - 1];
  return /^\d+$/.test(id) ? id : '0';
}
