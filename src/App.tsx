import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TrelloList from './components/TrelloList';
import React from 'react';

import { mockData } from './mockData';

function App() {
  const [trello, setTrello] = React.useState(mockData)

  // using useCallback is optional
  const onBeforeCapture = React.useCallback(() => {
    /*...*/
  }, []);
  const onBeforeDragStart = React.useCallback(() => {
    /*...*/
  }, []);
  const onDragStart = React.useCallback(() => {
    /*...*/
  }, []);
  const onDragUpdate = React.useCallback(() => {
    /*...*/
  }, []);
  const onDragEnd = React.useCallback(() => {
    // the only one that is required
  }, []);

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
            onBeforeCapture={onBeforeCapture}
            onBeforeDragStart={onBeforeDragStart}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
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
