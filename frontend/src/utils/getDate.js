

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};