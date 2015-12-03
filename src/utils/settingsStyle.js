function settingsStyle(borderColour) {
  return {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '35px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: `4px solid ${borderColour}`
    }
  };
}

export default settingsStyle;
