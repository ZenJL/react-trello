export interface IList {
  id: string,
  title: string,
  cards: string[]
}

export interface ICard {
  id: string,
  title: string,
}

export interface ITrello {
  columns: string[],
  lists: {
    [key as string]: IList
  },
  cards: {
    [key as string]: ICard
  },
}