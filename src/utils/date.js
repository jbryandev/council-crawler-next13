export default function FormatDate({ date, style = 'short' | 'long' }) {
  console.log(date);
  if (style === 'short') {
    date = new Date(date).toLocaleDateString('en-us', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
  } else {
    date = new Date(date).toLocaleDateString('en-us', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
  return date;
}
