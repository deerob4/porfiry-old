let quiz = {
  title: 'Test Quiz',
  start: new Date(),
  questionIntervals: 10000,
  realtimeGraphics: true,
  intervalLength: 300000,
  categories: [
  	{
  		name: 'History',
  		questions: [
  			{
  			  title: 'Who killed JFK?',
  			  answers: [
  			    { text: 'Bill Osmond', correct: false },
  			    { text: 'Lee Harvey Oswald', correct: true },
  			    { text: 'Henry Kissinger', correct: false }
  			  ]
  			},
  			{
  			  title: 'Who was the British Prime Minister in 1916?',
  			  answers: [
  			    { text: 'David Lloyd George', correct: true },
  			    { text: 'Lee Harvey Oswald', correct: false },
  			    { text: 'Lord Liverpool', correct: false }
  			  ]
  			},
  			{
  			  title: 'In the Napoleonic Wars, which battle took place immediately prior to Borodino?',
  			  answers: [
  			    { text: 'Austerlitz', correct: false },
  			    { text: 'Waterloo', correct: false },
  			    { text: 'Shevardino', correct: true },
  			    { text: 'Smolensk', correct: false }
  			  ]
  			}
  		]
  	},
  	{
  		name: 'Sport',
  		questions: [
  			{
  			  title: 'Who won the 1966 world cup?',
  			  answers: [
  			    { text: 'England', correct: true },
  			    { text: 'Wales', correct: false },
  			    { text: 'Scotland', correct: false },
  			    { text: 'Uzbekistan', correct: false }
  			  ]
  			},
  			{
  			  title: 'In which of England\'s national parks does the sport of fell running take place?',
  			  answers: [
  			    { text: 'Dartmoor', correct: false },
  			    { text: 'The Lake District', correct: true },
  			    { text: 'The Yorkshire Dales', correct: false },
  			    { text: 'Snowdonia', correct: false }
  			  ]
  			},
  			{
  			  title: 'Which city hosted the 1924 Summer Olympics?',
  			  answers: [
  			    { text: 'Brussels', correct: false },
  			    { text: 'Orelans', correct: false },
  			    { text: 'Madrid', correct: false },
  			    { text: 'Paris', correct: true }
  			  ]
  			}
  		]
  	},
  	{
  		name: 'Literature',
  		questions: [
  			{
  			  title: 'Who serves as the main character in "Crime and Punishment"?',
  			  answers: [
  			    { text: 'Raskolnikov', correct: true },
  			    { text: 'Razumikhin', correct: false },
  			    { text: 'Porifry Petrovich', correct: false },
  			    { text: 'Svidrigailov', correct: false }
  			  ]
  			},
  			{
  			  title: 'Which literary genre does "Ulysses" belong to?',
  			  answers: [
  			    { text: 'Modernist', correct: true },
  			    { text: 'Post-modernist', correct: false },
  			    { text: 'Romance', correct: false },
  			    { text: 'Thriller', correct: false }
  			  ]
  			},
  			{
  			  title: 'Which was the final book in C.S Lewis\' "The Chronicles of Narnia"?',
  			  answers: [
  			    { text: 'The Lion, The Witch, and the Wardrobe', correct: false },
  			    { text: 'The Last Battle', correct: true },
  			    { text: 'The Silver Chair', correct: false },
  			    { text: 'Prince Caspian', correct: false }
  			  ]
  			}
  		]
  	}
  ]
};

export default quiz;
