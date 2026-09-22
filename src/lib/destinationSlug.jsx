export function slugifyTitle(title) {
  if (!title) return "";
  return String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function normalizeSlug(input) {
  return slugifyTitle(input);
}

export function getDestinationSlug(destination) {
  if (!destination) return "";
  const slug = String(destination.slug || "").trim();
  if (slug) return slug;
  return slugifyTitle(destination.title || destination.name);
}

export function isValidSlug(slug) {
  if (!slug) return true;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
