const levels = [
  {
    levelMap: [
      ['blue', 'blue', 'blue', 'red', 'red', 'red'],
      ['blue', 'red', 'blue', 'red', 'blue', 'red'],
      ['blue', 'blue', 'blue', 'red', 'red', 'red']
    ],
    moves: 5,
    description: "Red beats blue"
  },
  {
    levelMap: [
      ['blue', 'green', 'blue', 'green', 'blue', 'green'],
      ['green', 'blue', 'green', 'blue', 'green', 'blue'],
      ['blue', 'green', 'blue', 'green', 'blue', 'blue']
    ],
    moves: 5,
    description: "Blue beats green"
  },
  {
    levelMap: [
      ['green', 'red', 'red', 'red', 'green', 'red'],
      ['red', 'blue', 'red', 'green', 'red', 'red'],
      ['red', 'red', 'green', 'red', 'blue', 'red'],
      ['red', 'green', 'red', 'red', 'red', 'green']
    ],
    moves: 8,
    description: "You can guess the next"
  }
]
export {levels};