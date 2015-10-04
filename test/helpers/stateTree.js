{
  route: '/maker',
  house: 'Acton',
  colours: {
    button: {
      border: '#fff',
      text: '#fff',
      background: '#fff'
    },
    select: {
      border: '#fff',
      text: '#fff',
      background: '#fff'
    },
    answer: {
      border: '#fff',
      text: '#fff',
      background: '#fff',
      icon: '#fff'
    },
    text: {
      primary: '#fff',
      secondary: '#fff'
    }
  },
  quiz: {
    categories: [
      {
        id: 0,
        name: 'History'
      }
    ]
    questions: [
      {
        id: 0,
        categoryId: 0
        body: 'Who killed JFK?'
      },
      {
        id: 1,
        categoryId: 0
        body: 'Who was the monarch in 1500?'
      },
      {
        id: 2,
        categoryId: 1,
        body: 'Who was the monarch in 1500?'
      }
    ]
    answers: {
      0: [
        {
          id: 0,
          body: 'Ann Boleyn' ,
          correct: false
        },
        {
          id: 1,
          body: 'Ann Boleyn',
          correct: false
        },
        {
          id: 0,
          body: 'Ann Boleyn' ,
          correct: false
        },
        {
          id: 0,
          body: 'Ann Boleyn' ,
          correct: false
        }
      ]
    }
  }
}
