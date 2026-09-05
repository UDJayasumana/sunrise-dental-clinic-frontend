export const formatDate = (dateString?: string | null): string => {
  if (!dateString) return '';

  // Replace space with 'T' to ensure ISO 8601 compliance across all browsers
  const parsedString = dateString.includes(' ') ? dateString.replace(' ', 'T') : dateString;
  const date = new Date(parsedString);

  // Fallback if the date is invalid to prevent app crashes
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date string passed to formatDate: "${dateString}"`);
    return dateString; // Returns original string if it fails, or return 'N/A'
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};