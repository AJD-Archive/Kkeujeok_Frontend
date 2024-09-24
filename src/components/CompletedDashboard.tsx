import { useNavigate, Outlet } from 'react-router-dom';
import Block from './Block';
import * as S from '../styles/DashboardStyled';
import { createPersonalBlock } from '../api/PersonalBlockApi';
import { Droppable } from 'react-beautiful-dnd';
import theme from '../styles/Theme/Theme';
import main2 from '../img/main2.png';
import { BlockListResDto } from '../types/PersonalBlock';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

type Props = {
  list: BlockListResDto[];
  id: string;
  dashboardId: string;
  onLoadMore: () => void;
};

const CompletedDashboard = ({ list, id, dashboardId, onLoadMore }: Props) => {
  const navigate = useNavigate();

  const settings = {
    backGroundColor: '#F7F1FF',
    highlightColor: theme.color.main2,
    progress: '완료',
    imgSrc: main2,
  };

  // + 버튼 누르면 사이드 페이지로 이동
  const handleAddBtn = async () => {
    // 초기 post 요청은 빈 내용으로 요청. 추후 patch로 자동 저장.
    const now = new Date();
    const startDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} 00:00`;
    const deadLine = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} 23:59`;

    const data = {
      dashboardId: dashboardId,
      title: '',
      contents: '',
      progress: 'COMPLETED',
      startDate: startDate,
      deadLine: deadLine,
    };

    const blockId = await createPersonalBlock(data);
    // console.log(blockId);

    const { highlightColor, progress } = settings;
    navigate(`personalBlock/${blockId}`, { state: { highlightColor, progress, blockId } });
  };

  // 세로 무한 스크롤
  const { ref: lastBlockRef, inView } = useInView({
    threshold: 0, // 마지막 블록이 0% 보였을 때를 감지
  });

  useEffect(() => {
    if (inView) {
      onLoadMore(); // 부모 컴포넌트에 새로운 데이터 요청
    }
  }, [inView]);

  return (
    <S.CardContainer backGroundColor={settings.backGroundColor}>
      <header>
        <S.StatusBarContainer highlightColor={settings.highlightColor}>
          <span>{settings.progress}</span>
        </S.StatusBarContainer>
        <S.AddButtonWrapper onClick={handleAddBtn}>
          <img src={settings.imgSrc} alt="블록 더하는 버튼" />
        </S.AddButtonWrapper>
      </header>
      <Droppable droppableId={id}>
        {provided => (
          <S.BoxContainer
            ref={provided.innerRef}
            className="container"
            {...provided.droppableProps}
          >
            {/* {list?.map((block, index) => (
              <Block
                dashboardId={dashboardId}
                key={block.blockId}
                index={index}
                title={block.title ?? ''}
                dDay={block.dDay ?? 0}
                contents={block.contents ?? ''}
                blockId={block.blockId ?? '0'}
                dType={block.dType ?? 'TeamDashboard'}
                name={block.nickname ?? '이름 없음'}
                picture={block.picture ?? ''}
              />
            ))} */}
            {list?.map((block, index) => {
              const isLastBlock = index === list.length - 1;
              return (
                <div key={block.blockId} ref={isLastBlock ? lastBlockRef : null}>
                  <Block
                    dashboardId={dashboardId}
                    index={index}
                    title={block.title ?? ''}
                    dDay={block.dDay ?? 0}
                    contents={block.contents ?? ''}
                    blockId={block.blockId ?? '0'}
                    dType={block.dType ?? 'TeamDashboard'}
                    name={block.nickname ?? '이름 없음'}
                    picture={block.picture ?? ''}
                    progress={settings.progress ?? ''}
                    highlightColor={settings.highlightColor ?? ''}
                  />
                </div>
              );
            })}
            {provided.placeholder}
          </S.BoxContainer>
        )}
      </Droppable>
      <Outlet />
    </S.CardContainer>
  );
};
export default CompletedDashboard;
function onLoadMore() {
  throw new Error('Function not implemented.');
}
