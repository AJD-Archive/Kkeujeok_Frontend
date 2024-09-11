import Flex from './Flex';
import edit from '../img/edit.png';
import deleteicon from '../img/delete.png';
import * as S from '../styles/DashboardStyled';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import Profile from './Profile';

type Props = {
  blockId: string;
  title: string;
  index: number;
  contents: string;
  dDay: number;
  dashboardId: string;
  dType: string;
  name: string;
  picture?: string;
};

const Block = ({ title, index, blockId, contents, dDay, dType, name, picture }: Props) => {
  const updatedBlockId = blockId ? (parseInt(blockId, 10) + 1).toString() : '1';

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (blockId) {
  //       // blockId가 null이 아닌 경우에만 호출
  //       const data = await getPersonalBlock(blockId);
  //       console.log(data);
  //       setBlock(data);
  //     }
  //   };

  //   fetchData();
  // }, [blockId]);

  return (
    <Link to={`personalBlock/${blockId}`}>
      <Draggable draggableId={updatedBlockId} key={updatedBlockId} index={index}>
        {provided => (
          <S.BlockContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Flex gap="6px" justifyContent="flex-end">
              <S.ImageIconWrapper>
                <img src={edit} alt="편집 버튼" />
              </S.ImageIconWrapper>
              <S.ImageIconWrapper>
                <img src={deleteicon} alt="편집 버튼" />
              </S.ImageIconWrapper>
            </Flex>
            <Flex justifyContent="space-between" margin="0 0 8px 0">
              <h3>{title}</h3>
              <span>D-{dDay}</span>
            </Flex>
            {dType === 'PersonalDashboard' ? (
              <p>{contents}</p>
            ) : (
              <Flex>
                <S.ProfileImageWrapper>
                  <Profile width="" height="" profile={picture} />
                </S.ProfileImageWrapper>
                <span>{name}</span>
              </Flex>
            )}
          </S.BlockContainer>
        )}
      </Draggable>
    </Link>
  );
};
export default Block;
