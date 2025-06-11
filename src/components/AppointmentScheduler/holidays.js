import moment from 'moment';
import { toGregorian } from 'hijri-converter';

// Helper function to calculate Easter Sunday (Western Christian, used for UK, Australia, Germany)
const getEasterSunday = (year) => {
  // Meeus/Jones/Butcher algorithm for Easter Sunday
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return moment(`${year}-${month}-${day}`, 'YYYY-M-D').toDate();
};

// Helper function to calculate Islamic holidays
const getIslamicHolidays = (year) => {
  // Eid-ul-Fitr: 1st of Shawwal (10th month)
  const eidUlFitrHijri = { hy: year, hm: 10, hd: 1 };
  const eidUlFitrGregorian = toGregorian(eidUlFitrHijri.hy, eidUlFitrHijri.hm, eidUlFitrHijri.hd);
  const eidUlFitr = moment(`${eidUlFitrGregorian.gy}-${eidUlFitrGregorian.gm}-${eidUlFitrGregorian.gd}`, 'YYYY-M-D');

  // Eid-ul-Adha: 10th of Dhu al-Hijjah (12th month)
  const eidUlAdhaHijri = { hy: year, hm: 12, hd: 10 };
  const eidUlAdhaGregorian = toGregorian(eidUlAdhaHijri.hy, eidUlAdhaHijri.hm, eidUlAdhaHijri.hd);
  const eidUlAdha = moment(`${eidUlAdhaGregorian.gy}-${eidUlAdhaGregorian.gm}-${eidUlAdhaGregorian.gd}`, 'YYYY-M-D');

  return [
    { date: eidUlFitr.format('YYYY-MM-DD'), name: 'Eid-ul-Fitr', country: 'Pakistan', isIslamic: true },
    { date: eidUlAdha.format('YYYY-MM-DD'), name: 'Eid-ul-Adha', country: 'Pakistan', isIslamic: true },
  ];
};

// Helper function to get nth occurrence of a day in a month
const getNthDayOfMonth = (year, month, dayOfWeek, n) => {
  const date = moment([year, month - 1]).startOf('month');
  let count = 0;
  while (count < n) {
    if (date.day() === dayOfWeek) {
      count++;
      if (count === n) return date;
    }
    date.add(1, 'day');
  }
};

// Helper function to get last occurrence of a day in a month
const getLastDayOfMonth = (year, month, dayOfWeek) => {
  const date = moment([year, month - 1]).endOf('month');
  while (date.day() !== dayOfWeek) {
    date.subtract(1, 'day');
  }
  return date;
};

export const getHolidays = (year) => {
  const easterSunday = getEasterSunday(year);
  const goodFriday = moment(easterSunday).subtract(2, 'days');
  const easterMonday = moment(easterSunday).add(1, 'days');
  const ascensionDay = moment(easterSunday).add(39, 'days');
  const whitMonday = moment(easterSunday).add(50, 'days');

  const holidays = [
    // USA Holidays
    { date: `${year}-01-01`, name: 'New Year’s Day', country: 'USA' },
    { date: getNthDayOfMonth(year, 1, 1, 3).format('YYYY-MM-DD'), name: 'MLK Day', country: 'USA' },
    { date: getNthDayOfMonth(year, 2, 1, 3).format('YYYY-MM-DD'), name: 'Presidents’ Day', country: 'USA' },
    { date: getLastDayOfMonth(year, 5, 1).format('YYYY-MM-DD'), name: 'Memorial Day', country: 'USA' },
    { date: `${year}-06-19`, name: 'Juneteenth', country: 'USA' },
    { date: `${year}-07-04`, name: 'Independence Day', country: 'USA', isIndependence: true },
    { date: getNthDayOfMonth(year, 9, 1, 1).format('YYYY-MM-DD'), name: 'Labor Day', country: 'USA' },
    { date: getNthDayOfMonth(year, 10, 1, 2).format('YYYY-MM-DD'), name: 'Columbus Day', country: 'USA' },
    { date: `${year}-11-11`, name: 'Veterans Day', country: 'USA' },
    { date: getNthDayOfMonth(year, 11, 4, 4).format('YYYY-MM-DD'), name: 'Thanksgiving', country: 'USA' },
    { date: `${year}-12-25`, name: 'Christmas', country: 'USA' },
    // UK Holidays
    { date: goodFriday.format('YYYY-MM-DD'), name: 'Good Friday', country: 'UK' },
    { date: easterMonday.format('YYYY-MM-DD'), name: 'Easter Monday', country: 'UK' },
    { date: getNthDayOfMonth(year, 5, 1, 1).format('YYYY-MM-DD'), name: 'Early May Bank Holiday', country: 'UK' },
    { date: getLastDayOfMonth(year, 8, 1).format('YYYY-MM-DD'), name: 'Summer Bank Holiday', country: 'UK' },
    { date: `${year}-12-26`, name: 'Boxing Day', country: 'UK' },
    // Australian Holidays
    { date: `${year}-01-26`, name: 'Australia Day', country: 'Australia', isIndependence: true },
    { date: goodFriday.format('YYYY-MM-DD'), name: 'Good Friday', country: 'Australia' },
    { date: easterMonday.format('YYYY-MM-DD'), name: 'Easter Monday', country: 'Australia' },
    { date: `${year}-04-25`, name: 'Anzac Day', country: 'Australia' },
    { date: getNthDayOfMonth(year, 6, 1, 2).format('YYYY-MM-DD'), name: 'King’s Birthday', country: 'Australia' },
    { date: getLastDayOfMonth(year, 10, 1).format('YYYY-MM-DD'), name: 'Labour Day', country: 'Australia' },
    { date: `${year}-12-25`, name: 'Christmas', country: 'Australia' },
    { date: `${year}-12-26`, name: 'Boxing Day', country: 'Australia' },
    // German Holidays
    { date: `${year}-05-01`, name: 'Labour Day', country: 'Germany' },
    { date: ascensionDay.format('YYYY-MM-DD'), name: 'Ascension Day', country: 'Germany' },
    { date: whitMonday.format('YYYY-MM-DD'), name: 'Whit Monday', country: 'Germany' },
    { date: `${year}-10-03`, name: 'German Unity Day', country: 'Germany', isIndependence: true },
    // Pakistani Holidays
    { date: `${year}-02-05`, name: 'Kashmir Day', country: 'Pakistan' },
    { date: `${year}-03-23`, name: 'Pakistan Day', country: 'Pakistan' },
    { date: `${year}-05-01`, name: 'Labour Day', country: 'Pakistan' },
    { date: `${year}-08-14`, name: 'Independence Day', country: 'Pakistan', isIndependence: true },
    { date: `${year}-11-09`, name: 'Iqbal Day', country: 'Pakistan' },
    { date: `${year}-12-25`, name: 'Quaid-e-Azam Day', country: 'Pakistan' },
    // Islamic Holidays (Pakistan)
    ...getIslamicHolidays(year),
  ];

  return holidays;
};

// Helper function to get flag gradient for a country
export const getFlagGradient = (country) => {
  switch (country) {
    case 'USA':
      return 'linear-gradient(90deg, rgba(255,0,0,0.3) 33%, rgba(255,255,255,0.3) 33%, rgba(255,255,255,0.3) 66%, rgba(0,0,255,0.3) 66%)';
    case 'UK':
      return 'linear-gradient(45deg, rgba(0,0,139,0.3) 40%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.3) 60%, rgba(255,0,0,0.3) 60%)';
    case 'Australia':
      return 'linear-gradient(90deg, rgba(0,0,139,0.3) 33%, rgba(255,255,255,0.3) 33%, rgba(255,255,255,0.3) 66%, rgba(255,0,0,0.3) 66%)';
    case 'Germany':
      return 'linear-gradient(to bottom, rgba(0,0,0,0.3) 33%, rgba(255,0,0,0.3) 33%, rgba(255,0,0,0.3) 66%, rgba(255,204,0,0.3) 66%)';
    case 'Pakistan':
      return 'linear-gradient(90deg, rgba(255,255,255,0.3) 25%, rgba(0,64,0,0.3) 25%)';
    default:
      return 'none';
  }
};