function sortByDay(array) {
  array.sort((a, b) => {
    let fa = a.day, fb = b.day;
    if (fa > fb) return -1;
    if (fa < fb) return 1;
    return 0;
  });
}

export default sortByDay;