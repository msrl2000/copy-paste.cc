const adjectives: string[] = [
  'Bamboo',
  'כרוב',
  'קקטוס',
  'אגוז',
  'שום',
  'לימון',
  'תפוח',
  'אבטיח',
  'בצל',
  'תפוז',
  'שזיף',
  'טופו',
  'אבוקדו',
  'מלון',
];

const nouns: string[] = [
  'טעים',
  'מדהים',
  'מר',
  'בגריל',
  'צלוי',
  'מוקרם',
  'נפלא',
  'טרי',
  'מטוגן',
  'מעולה',
  'עסיסי',
  'לח',
  'בוסרי',
  'קלוי',
  'מלוח',
  'מתובל',
  'קצוץ',
  'חמוץ',
  'מתקתק',
  'מתוק',
  'ישן',
];

function arrayRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export const generateClientName = () => {
  const adjective = arrayRandom(adjectives);
  const noun = arrayRandom(nouns);

  return `${adjective} ${noun}`;
};
