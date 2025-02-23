// export const mockData = [
//   {
//     id: 'list-1',
//     title: 'List 1',
//     cards: [
//       { id: 'card1', title: 'card2' },
//       { id: 'card1', title: 'card2' }
//     ]
//   },
//   {
//     id: 'list-2',
//     title: 'List 2',
//     cards: [
//       { id: 'card2', title: 'card232' },
//       { id: 'card23', title: 'card2323' }
//     ]
//   }
// ]

import { ITrello } from "./types";

// hash object
export const mockData: ITrello = {
  columns: ['list-1', 'list-2'],
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'List 1',
      cards: ['card1-1', 'card1-2']
    },
    'list-2': {
      id: 'list-2',
      title: 'List 2',
      cards: ['card2-2']
    }
  },
  cards: {
    'card1-1': {
      id: 'card1-1',
      title: 'Card 1 1',
    },
    'card1-2': {
      id: 'card1-2',
      title: 'Card 1 2',
    },
    'card2-2': {
      id: 'card2-2',
      title: 'Card 2 2',
    }
  }
}