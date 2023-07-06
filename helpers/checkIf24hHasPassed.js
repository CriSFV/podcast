
export const checkIf24hPassedToValidateInfo = (date) => {
    const twentyFourHours = 60 * 60 * 24 * 1000;
    return Date.now() - date >= twentyFourHours
  }

