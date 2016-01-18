function colourScheme(house) {
  const colours = {
    acton: {
      'answer': {
        'body': {
          'backgroundColor': '#f78f85',
          'borderColor': '#c6726a',
          'color': '#945650'
        },
        'check': {
          'color': '#633935'
        }
      },
      'select': {
        'backgroundColor': '#85edf7',
        'borderColor': '#6abec6',
        'color': '#508e94'
      },
      'button': {
        'backgroundColor': '#a0ffff',
        'borderColor': '#80cccc',
        'color': '#609999'
      },
      'text': {
        'primary': {
          'color': '#71c9d2'
        },
        'secondary': {
          'color': '#78d5de'
        }
      },
      'settings': {
        'borderColour': '#c6726a',
        'label': {
          'color': '#c6726a'
        }
      }
    },
    baxter: {
      'answer': {
        'body': {
          'backgroundColor': '#9fdffc',
          'borderColor': '#7fb2ca',
          'color': '#5f8697'
        },
        'check': {
          'color': '#405965'
        }
      },
      'select': {
        'backgroundColor': '#fcbc9f',
        'borderColor': '#ca967f',
        'color': '#97715f'
      },
      'button': {
        'backgroundColor': '#ffe2bf',
        'borderColor': '#ccb599',
        'color': '#998873'
      },
      'text': {
        'primary': {
          'color': '#d6a087'
        },
        'secondary': {
          'color': '#e3a98f'
        }
      },
      'settings': {
        'borderColour': '#7fb2ca',
        'label': {
          'color': '#7fb2ca'
        }
      }
    },
    clive: {
      'answer': {
        'body': {
          'backgroundColor': '#f98f8e',
          'borderColor': '#c77272',
          'color': '#955655'
        },
        'check': {
          'color': '#643939'
        }
      },
      'select': {
        'backgroundColor': '#8ef8f9',
        'borderColor': '#72c6c7',
        'color': '#559595'
      },
      'button': {
        'backgroundColor': '#aaffff',
        'borderColor': '#88cccc',
        'color': '#669999'
      },
      'text': {
        'primary': {
          'color': '#79d3d4'
        },
        'secondary': {
          'color': '#80dfe0'
        }
      },
      'settings': {
        'borderColour': '#c77272',
        'label': {
          'color': '#c77272'
        }
      }
    },
    darwin: {
      'answer': {
        'body': {
          'backgroundColor': '#a1ed80',
          'borderColor': '#81be66',
          'color': '#618e4d'
        },
        'check': {
          'color': '#405f33'
        }
      },
      'select': {
        'backgroundColor': '#cc80ed',
        'borderColor': '#a366be',
        'color': '#7a4d8e'
      },
      'button': {
        'backgroundColor': '#f59aff',
        'borderColor': '#c47bcc',
        'color': '#935c99'
      },
      'text': {
        'primary': {
          'color': '#ad6dc9'
        },
        'secondary': {
          'color': '#b873d5'
        }
      },
      'settings': {
        'borderColour': '#81be66',
        'label': {
          'color': '#81be66'
        }
      }
    },
    houseman: {
      'answer': {
        'body': {
          'backgroundColor': '#76fce8',
          'borderColor': '#5ecaba',
          'color': '#47978b'
        },
        'check': {
          'color': '#2f655d'
        }
      },
      'select': {
        'backgroundColor': '#fc768a',
        'borderColor': '#ca5e6e',
        'color': '#974753'
      },
      'button': {
        'backgroundColor': '#ff8ea6',
        'borderColor': '#cc7285',
        'color': '#995564'
      },
      'text': {
        'primary': {
          'color': '#d66475'
        },
        'secondary': {
          'color': '#e36a7c'
        }
      },
      'settings': {
        'borderColour': '#5ecaba',
        'label': {
          'color': '#5ecaba'
        }
      }
    },
    webb: {
      'answer': {
        'body': {
          'backgroundColor': '#8e9dff',
          'borderColor': '#727ecc',
          'color': '#555e99'
        },
        'check': {
          'color': '#393f66'
        }
      },
      'select': {
        'backgroundColor': '#fff08e',
        'borderColor': '#ccc072',
        'color': '#999055'
      },
      'button': {
        'backgroundColor': '#ffffaa',
        'borderColor': '#cccc88',
        'color': '#999966'
      },
      'text': {
        'primary': {
          'color': '#d9cc79'
        },
        'secondary': {
          'color': '#e6d880'
        }
      },
      'settings': {
        'borderColour': '#727ecc',
        'label': {
          'color': '#727ecc'
        }
      }
    }
  };

  return colours[house];
}

export default colourScheme;
