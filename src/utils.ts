export const useUtils = () => {
  const getShortDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('sv-SE', { month: 'short' });
    return `${day} ${month}`;
  };

  return {
    getShortDate
  }
}