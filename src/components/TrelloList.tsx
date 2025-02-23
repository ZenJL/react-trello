import { Card, Tooltip, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import TrelloCard from './TrelloCard';
import { ICard } from '../types';
// index={listIndex}
// title={listItem.title}
// cards={cards}
// listId={listItem.id}

interface TrelloListProps {
  index: number,
  title: string,
  cards: ICard[],
  listId: string
}

function TrelloList({
  index,
  title,
  cards,
  listId
}: TrelloListProps) {
  return (
    <Draggable draggableId={String(listId)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='todoList'
        >
          <Droppable droppableId={String(listId)} type="CARD" direction='vertical'>
            {(provided) => (
              <Card 
                title={title}
                className='cardList'
                extra={
                  <>
                    <Tooltip title="Add card">
                      <Button shape="circle" icon={<PlusOutlined />}  style={{ marginRight: 5 }} />
                    </Tooltip>
                    <Tooltip title="Delete card">
                      <Button shape="circle" icon={<DeleteOutlined />} />
                    </Tooltip>
                  </>
                } 
              >
                <div
                  ref={provided.innerRef}
                  // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                  {...provided.droppableProps}
                  className='trelloList_content'
                >
                  {cards.map((card, cardIndex) => {
                    return (
                      <TrelloCard 
                        key={card.id}
                        index={cardIndex}
                        card={card}                      
                      />
                    )
                  })}
                </div>
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
          
        </div>
      )}
    </Draggable>
  )
}

export default TrelloList