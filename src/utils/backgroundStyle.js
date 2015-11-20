export default house => {
  const backgroundMap = {
    'acton': '#8dd6f8',
    'baxter': '#FFF7E9;',
    'clive': '#78ecf6',
    'darwin': '#cd99f5',
    'houseman': '#f88e8c',
    'webb': '#fae07c'
  };

  return {
    height: window.innerHeight + 'px',
    width: '100%',
    backgroundColor: backgroundMap[house],
    padding: '10px'
  };
};
