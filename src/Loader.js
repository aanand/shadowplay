import Papa from "papaparse";

class Loader {
  load(rawData) {
    Papa.parse(rawData, {
      header: true,
      complete: results => {
        const data = this.loadTweets(results.data);
        if (typeof this.onComplete === "function") {
          this.onComplete(data);
        }
      }
    });
  }

  loadTweets(tweets) {
    const months = {};

    tweets.forEach(tweet => {
      if (!tweet.timestamp) {
        // sometimes there's a blank entry at the end
        return;
      }

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
  }
}

export default Loader;
