class Loader {
  load(rawData) {
    const data = this.loadTimestamps(rawData.split("\n"));
    if (typeof this.onComplete === "function") {
      this.onComplete(data);
    }
  }

  loadTimestamps(timestamps) {
    const months = {};

    timestamps.forEach((timestamp) => {
      const [date, time] = timestamp.split("T");
      const [y, m] = date.split("-");

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
      .map((key) => {
        return Array.from(Array(24).keys())
          .map((i) => String(i).padStart(2, "0"))
          .map((hour) => months[key][hour] || 0);
      });
  }
}

export default Loader;
