/*
Given an array of arrays of per-hour tweet frequency distributions, choose the
offset to begin the day at, such that the overall variance is at a minimum. This
should generally lead to nice-looking histograms with a single peak in the
middle, rather than one at each end.

Returns an integer between -12 and +11.
*/
export default months => {
  const hours = range(24);
  const totals0 = hours.map(h => sum(months.map(m => m[h])));

  const variances = hours.map(offset => {
    const totals = wrap(totals0, -offset);
    const mean = sum(hours.map(h => h * totals[h])) / sum(totals);
    const variance =
      sum(totals.map((t, h) => t * (h - mean) ** 2)) / totals.length;
    return variance;
  });

  let bestOffset = variances.indexOf(Math.min(...variances));
  if (bestOffset > 12) {
    bestOffset -= 24;
  }

  return bestOffset;
};

const range = length => Array.from(Array(length).keys());

const sum = array => array.reduce((a, b) => a + b, 0);

const wrap = (array, offset) =>
  array.slice(offset).concat(array.slice(0, offset));
