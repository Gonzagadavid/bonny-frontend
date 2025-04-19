export function applyPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 2) {
    return `(${digits}`;
  } else if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  } else {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }
}

export function applyDateMask(value: string): string {
  const digits = value.replace(/\D/g, "");

  let day = "";
  if (digits.length >= 1) {
    const firstDigit = Number.parseInt(digits[0]);
    if (firstDigit > 3) {
      day = "0" + firstDigit;
    } else {
      day = digits[0];

      if (digits.length >= 2) {
        const secondDigit = Number.parseInt(digits[1]);
        if (firstDigit === 3 && secondDigit > 1) {
          day += "1";
        } else {
          day += digits[1];
        }
      }
    }
  }

  let month = "";
  if (digits.length >= 3) {
    const firstDigit = Number.parseInt(digits[2]);
    if (firstDigit > 1) {
      month = "0" + firstDigit;
    } else {
      month = digits[2];

      if (digits.length >= 4) {
        const secondDigit = Number.parseInt(digits[3]);
        if (firstDigit === 1 && secondDigit > 2) {
          month += "2";
        } else {
          month += digits[3];
        }
      }
    }
  }

  let year = "";
  if (digits.length >= 5) {
    year = digits.slice(4, 8);
  }

  if (day && month && year) {
    return `${day}-${month}-${year}`;
  } else if (day && month) {
    return `${day}-${month}`;
  } else if (day) {
    return day;
  }

  return "";
}

export function parseMaskedDate(maskedDate: string): Date | null {
  const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
  const match = maskedDate.match(datePattern);

  if (match) {
    const [_, day, month, year] = match;

    const dayNum = Number.parseInt(day);
    const monthNum = Number.parseInt(month);

    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12) {
      return null;
    }

    if (monthNum === 2) {
      const isLeapYear =
        (Number.parseInt(year) % 4 === 0 &&
          Number.parseInt(year) % 100 !== 0) ||
        Number.parseInt(year) % 400 === 0;
      if ((isLeapYear && dayNum > 29) || (!isLeapYear && dayNum > 28)) {
        return null;
      }
    } else if ([4, 6, 9, 11].includes(monthNum) && dayNum > 30) {
      return null;
    }

    const date = new Date(`${year}-${month}-${day}`);

    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  return null;
}
