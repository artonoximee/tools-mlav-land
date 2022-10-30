function sortByCreationDate(array) {
  array.sort((a, b) => {
    let fa = a.createdAt, fb = b.createdAt;
    if (fa > fb) return -1;
    if (fa < fb) return 1;
    return 0;
  });
}

export default sortByCreationDate;