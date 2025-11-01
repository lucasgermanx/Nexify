function percentageDifference(originalValue: number, newValue: number) {
  if (originalValue === 0) {
    return 0
  }

  const difference = newValue - originalValue;
  const percentageDifference = (difference / originalValue) * 100;
  return Math.abs(percentageDifference as number).toFixed(0);
}

export default percentageDifference