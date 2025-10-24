import 'react-datepicker/dist/react-datepicker.css';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

import { BlockNoteView } from '@blocknote/mantine';
import React from 'react';
import DatePicker from 'react-datepicker';
import { useLocation, useNavigate } from 'react-router-dom';

import Flex from '../components/Flex';
import { useSidePage } from '../hooks/useSidePage';
import closebutton from '../img/closebutton.png';
import {
  D_Day,
  DateContainer,
  ImgWrapper,
  Input,
  SideScreen,
  SideScreenContainer,
  StatusBarContainer,
  StyledDatePicker,
  StyledEditorWrapper,
  TitleContainer,
} from '../styles/SidePageStyled';

const SidePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { highlightColor, progress } = location.state || {};
  const blockId = location.pathname.split('/').pop();

  const { data, handleTitleChange, handleDateChange, onChange, editor, SubmitData, parseDate } = useSidePage(
    blockId,
    progress,
  );
  console.log(SubmitData);

  const toggleFunc = (event: React.MouseEvent) => {
    // SubmitData();
    navigate(-1);
    event.stopPropagation();
  };

  if (!editor) return <div>Loading editor...</div>;

  // 자동 저장
  /*
  ? debounce 초가 생각보다 짧은데 굳이 interval까지 쓸 필요가 있을까?
  */
  /*
   const autoSaveCallback = () => {
    console.log('시간에 맞춰 자동 저장 함수 호출~~');
    onClick();
  };
  useInterval(autoSaveCallback, 1000 * 10);
 */

  // 탭 닫는 + 새로고침 이벤트 감지 (특별한 조치는 못하고, 크롬 자체에서 정말 창을 끌거냐는 경고창 보여주기 가능)
  /*
   useEffect(() => {
    const handleBeforeUnload = (event: { preventDefault: () => void; returnValue: string }) => {
      event.preventDefault();
      event.returnValue = ''; // 필요에 따라 메시지를 반환할 수 있음
      console.log('야호~');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  */

  // ! 라우터 변경 감지 : 라우터 변경시 데이터 저장 => 구글 애널리틱스 적용 이후 오류나서 주석처리
  // useBlocker(tx => {
  //   const { currentLocation, nextLocation } = tx;

  //   if (currentLocation.pathname !== nextLocation.pathname) {
  //     SubmitData();
  //     return false;
  //   }
  //   return true;
  // });
  // ! 페이지 나갈때 자동저장 다시 구현
  // const ref = useRef(false);

  // useEffect(() => {
  //   return () => SubmitData();
  // return () => alert('히히');
  // return () => {
  //   if (ref.current) return;
  //   ref.current = true;
  //   alert('ss');
  // };
  // }, []);

  return (
    <SideScreenContainer onClick={toggleFunc}>
      <SideScreen
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ImgWrapper alt='닫기 버튼' src={closebutton} onClick={toggleFunc} />

        {/* 제목 입력 */}
        <TitleContainer>
          <StatusBarContainer highlightColor={highlightColor}>
            <span>{progress}</span>
          </StatusBarContainer>
          <Input
            name='title'
            placeholder='제목을 입력하세요.'
            type='text'
            value={data.title}
            onChange={handleTitleChange}
          />
        </TitleContainer>

        {/* 날짜 및 시간 설정 */}
        <DateContainer>
          <Flex justifyContent='space-between'>
            <D_Day>{data.dDay}</D_Day>
            <StyledDatePicker>
              <DatePicker
                showTimeSelect
                dateFormat='yyyy.MM.dd HH:mm'
                selected={parseDate(data.startDate)}
                timeIntervals={10} // 10분 간격으로 시간 선택
                onChange={(date: Date | null) => handleDateChange(date, 'start')}
              />
              <p>~</p>
              <DatePicker
                showTimeSelect
                dateFormat='yyyy.MM.dd HH:mm'
                minDate={data.startDate ? new Date(data.startDate) : undefined}
                selected={parseDate(data.deadLine)}
                timeIntervals={10} // 10분 간격으로 시간 선택
                onChange={(date: Date | null) => handleDateChange(date, 'end')}
              />
            </StyledDatePicker>
            <div />
          </Flex>
          <hr />
        </DateContainer>

        {/* 본문 작성 */}
        <StyledEditorWrapper>
          <BlockNoteView editor={editor} theme='light' onChange={onChange} />
        </StyledEditorWrapper>
      </SideScreen>
    </SideScreenContainer>
  );
};

export default React.memo(SidePage);
