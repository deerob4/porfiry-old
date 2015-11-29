// The styles applied to the settings modal in
// the quiz creator. Easier to split it out like this.
function settingsStyle(house) {
  // The different styles depending on
  // the user's house.
  let houseStyles = {
    acton: {
      content: {
        border: '3px solid #6eaac6',
        backgroundColor: '#b9e6fb'
      },
      overlay: {
        backgroundColor: 'rgba(175, 226, 250, 0.65)'
      }
    },
    baxter: {
      content: {
        border: '3px solid #c29661',
        backgroundColor: '#fad5a8'
      },
      overlay: {
        backgroundColor: 'rgba(248,192,125,0.65)'
      }
    },
    clive: {
      content: {
        border: '3px solid #5eb7bf',
        backgroundColor: '#a3f2f9'
      },
      overlay: {
        backgroundColor: 'rgba(120,236,246,0.65)'
      }
    },
    darwin: {
      content: {
        border: '3px solid #a37ac2',
        backgroundColor: '#e2c2f9'
      },
      overlay: {
        backgroundColor: 'rgba(205,153,245,0.65)'
      }
    },
    houseman: {
      content: {
        border: '3px solid #c66e6d',
        backgroundColor: '#fbb8b8'
      },
      overlay: {
        backgroundColor: 'rgba(248,142,140,0.65)'
      }
    },
    webb: {
      content: {
        border: '3px solid #c6b15e',
        backgroundColor: '#fceba8'
      },
      overlay: {
        backgroundColor: 'rgba(250,224,124,0.65)'
      }
    }
  };

  return {
    // Styles common to any house.
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '35px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
      // House specific content styles.
      // ...houseStyles[house].content
    },
    overlay: {
      // ...houseStyles[house].overlay
    }
  };
}

export default settingsStyle;
