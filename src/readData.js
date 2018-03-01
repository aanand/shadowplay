import parse from "csv-parse/lib/sync";

export default rawData => {
  const tweets = parse(rawData, {
    columns: true
  });

  const months = {};

  tweets.forEach(tweet => {
    const [date, time] = tweet.timestamp.split(" ");
    const [y, m] = date.split("-");
    if (parseInt(y, 10) < 2011) {
      return;
    }

    const key = [y, m].join("-");
    if (!months[key]) {
      months[key] = {};
    }

    const hour = time.split(":")[0];
    if (hour in months[key]) {
      months[key][hour] += 1;
    } else {
      months[key][hour] = 1;
    }
  });

  return Object.keys(months)
    .sort()
    .map(key => {
      return Array.from(Array(24).keys())
        .map(i => String(i).padStart(2, "0"))
        .map(hour => months[key][hour] || 0);
    });
};
