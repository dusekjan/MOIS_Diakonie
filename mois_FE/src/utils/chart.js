export function groupByDate(data) {
  return data.reduce((groups, item) => {
    const date = item.createdAt;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
}