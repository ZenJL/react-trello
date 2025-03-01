import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import TrelloList from './components/TrelloList';
import React from 'react';

import { mockData } from './mockData';
import { IEventDragDrop, ITrello } from './types';

function App() {
  const [trello, setTrello] = React.useState<ITrello>(mockData)

  // // using useCallback is optional
  // const onBeforeCapture = React.useCallback((e) => {
  //   /*...*/
  //   console.log('onBeforeCapture', e)
    
  // }, []);

  // const onBeforeDragStart = React.useCallback((e) => {
  //   /*...*/

  //   console.log('onBeforeDragStart', e)
  // }, []);

  // const onDragStart = React.useCallback((e) => {
  //   /*...*/
  //   console.log('onDragStart', e)
  // }, []);

  // const onDragUpdate = React.useCallback((e) => {
  //   /*...*/
  //   console.log('onDragUpdate', e)
  // }, []);

  const onDragEnd = React.useCallback((event: IEventDragDrop) => {
    const { source, destination, type, draggableId } = event;
    const sourceIndex = source.index;
    const sourceDroppableId = source.droppableId;

    const destinationIndex = destination.index;
    const destinationDroppableId = destination.droppableId;

    console.log('onDragEnd', {
      event,
      trello
    })

    if(!destination) return;

    if(type === 'LIST') {
      // ....
      const newColumns = [...trello.columns];
      // array.splice(): add, remove, update
      newColumns.splice(sourceIndex, 1); // delete item
      newColumns.splice(destinationIndex, 0, draggableId); // add item
      setTrello(prevState => {
        return {
          ...prevState,
          columns: newColumns
        }
      })

      return;
    }

    // drag drop card same list
    if(sourceDroppableId === destinationDroppableId) {
      setTrello(prevState => {
        const newCards = [...(prevState.lists as any)[sourceDroppableId].cards];
        newCards.splice(sourceIndex, 1);
        newCards.splice(destinationIndex, 0, draggableId);
        return {
          ...prevState,
          lists: {
            ...prevState.lists,
            [sourceDroppableId]: {
              ...(prevState.lists as any)[sourceDroppableId],
              cards: newCards
            }
          }
        }
      })
      return;
    }

    // drag drop card same list
    setTrello(prevState => {
      const newCardsSource = [...(prevState.lists as any)[sourceDroppableId].cards];
      newCardsSource.splice(sourceIndex, 1);

      const newCardsDestination = [...(prevState.lists as any)[destinationDroppableId].cards];
      newCardsDestination.splice(destinationIndex, 0, draggableId);

      return {
        ...prevState,
        lists: {
          ...prevState.lists,
          [sourceDroppableId]: {
            ...(prevState.lists as any)[sourceDroppableId],
            cards: newCardsSource
          },
          [destinationDroppableId]: {
            ...(prevState.lists as any)[destinationDroppableId],
            cards: newCardsDestination
          },
        }
      }
    })
  }, [trello]);

  console.log('render: ', trello)

  return (
    <>
      <header>
        <div className="header__container">
          <div className="header__logo"></div>
          <div className="header__right">
            <div className="header__avatar">
              <img src="/assets/images/avatar.png" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <DragDropContext
            // onBeforeCapture={onBeforeCapture}
            // onBeforeDragStart={onBeforeDragStart}
            // onDragStart={onDragStart}
            // onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
          >
            <Droppable droppableId="all-list" type="LIST" direction='horizontal'>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                  className='listContainer'
                  {...provided.droppableProps}
                >
                  <>
                    {trello.columns.map((listId, listIndex) => {
                      const listItem = trello.lists[listId];
                      const cards = listItem.cards.map(cardId => trello.cards[cardId])
                      
                      return  (
                        <TrelloList 
                          key={listItem.id}
                          index={listIndex}
                          title={listItem.title}
                          cards={cards}
                          listId={listItem.id}
                        />
                      )
                    })}
                    {provided.placeholder}
                    <Button type="text"><PlusOutlined /> Add another list</Button>
                  </>
                </div>
              )}
            </Droppable>
            
          </DragDropContext>
            
         

        </div>
      </main>
    </>
  )
}

export default App
