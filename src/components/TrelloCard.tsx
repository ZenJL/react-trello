import { Card, Avatar } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';import { ICard } from '../types';
;

const { Meta } = Card;

interface TrelloCardProps {
  card: ICard,
  index: number
}

function TrelloCard({ card, index }: TrelloCardProps) {
  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='card'
        >
          <Card
            className='cardItem'
            cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            }
            actions={[
              <EyeOutlined key="view" />,
              <EditOutlined key="edit" />,
              <DeleteOutlined key="delete" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </div>
      )}
    </Draggable>
  )
}

export default TrelloCard