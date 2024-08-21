import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Flex from '../components/Flex';
import trash from '../img/delete2.png';
import closebutton from '../img/closebutton.png';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import {
  SideScreenContainer,
  SideScreen,
  StyledEditorWrapper,
  ImgWrapper,
  StatusBarContainer,
  DateContainer,
  TitleContainer,
  D_Day,
  StyledDatePicker,
  Input,
} from '../styles/SidePageStyled';
import { useSidePage } from '../hooks/useSidePage';
import { BlockNoteView } from '@blocknote/mantine';

const SidePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { highlightColor, progress } = location.state || {};

  const { title, startDate, endDate, handleTitleChange, onDateChange, onChange, editor } =
    useSidePage();

  const toggleFunc = (event: React.MouseEvent) => {
    navigate(-1);
    event.stopPropagation();
  };

  if (!editor) return <div>Loading editor...</div>;

  return (
    <SideScreenContainer onClick={toggleFunc}>
      <SideScreen
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <ImgWrapper src={closebutton} alt="닫기 버튼" onMouseDown={toggleFunc} />

        {/* 제목 입력 */}
        <TitleContainer>
          <StatusBarContainer highlightColor={highlightColor}>
            <span>{progress}</span>
          </StatusBarContainer>
          <Input
            type="text"
            name="title"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={handleTitleChange}
          />
        </TitleContainer>

        {/* 날짜 및 시간 설정 */}
        <DateContainer>
          <Flex justifyContent="space-between">
            <D_Day>D-10</D_Day>
            <StyledDatePicker>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => onDateChange(date, 'start')}
                showTimeSelect
                dateFormat="yyyy년 MM월 dd일 HH:mm"
                timeIntervals={10} // 10분 간격으로 시간 선택
              />
              <p>~</p>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => onDateChange(date, 'end')}
                showTimeSelect
                dateFormat="yyyy년 MM월 dd일 HH:mm"
                timeIntervals={10} // 10분 간격으로 시간 선택
              />
            </StyledDatePicker>
            <ImgWrapper src={trash} alt="휴지통 버튼" />
          </Flex>
          <hr />
        </DateContainer>

        {/* 본문 작성 */}
        <StyledEditorWrapper>
          <BlockNoteView editor={editor} onChange={onChange} />
        </StyledEditorWrapper>
      </SideScreen>
    </SideScreenContainer>
  );
};

export default SidePage;
