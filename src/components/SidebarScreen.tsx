import { useAtom } from 'jotai';
import { useRef, useState } from 'react';

import { visibleAtom } from '../contexts/sideScreenAtom';
import closebutton from '../img/closebutton.png';
import trash from '../img/delete2.png';
import edit from '../img/edit.png';
import * as S from '../styles/SideScreenStyled';
import Flex from './Flex';
import Profile from './Profile';

const SidebarScreen = () => {
  const [inputText, setInputText] = useState<string>('');
  console.log(inputText);
  const [_, setVisibleValue] = useAtom(visibleAtom);

  const editorRef = useRef<HTMLDivElement>(null);

  //사이드 스크린 상태 변수 변경 함수
  const toggleFunc = (event: React.MouseEvent) => {
    setVisibleValue((prev) => !prev);
    event.stopPropagation();
  };

  const onInputHandler = (event: React.SyntheticEvent<HTMLDivElement>) => {
    setInputText((event.target as HTMLDivElement).innerText);
  };

  return (
    <S.SideScreenContainer onClick={toggleFunc}>
      <S.SideScreen
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <S.ImgWrapper>
          <img alt='닫기 버튼' src={closebutton} onMouseDown={toggleFunc} />
        </S.ImgWrapper>
        <header>
          <Flex gap='0.6785rem' margin='0 0 0.5rem 0'>
            <Profile height='35px' width='35px' />
            <span>김신아</span>
          </Flex>
          <S.TitleContainer>
            <input placeholder='제목을 입력해주세요' />
            <Flex gap='0.5625rem'>
              <img alt='편집 버튼' src={edit} />
              <img alt='휴지통 버튼' src={trash} />
            </Flex>
          </S.TitleContainer>
          <hr />
        </header>

        <S.TextEditingWrapper ref={editorRef} contentEditable onInput={onInputHandler} />
      </S.SideScreen>
    </S.SideScreenContainer>
  );
};
export default SidebarScreen;
