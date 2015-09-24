function maxKey(ob) {
  return Object.keys(obj).reduce((a, b) =>
    obj[a] > obj[b] ? a : b
  );
}

export default maxKey;
