function formatTime(ms) {
  const seconds = (ms / 1000) % 60;
  const minutes = (ms / 60000) % 60;
  const hours = (ms / 3600000) % 60;

  return { hours, minutes, seconds };
}

export default formatTime;
