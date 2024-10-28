import Profile from './Profile';
import Flex from './Flex';
import edit from '../img/edit.png';
import trash from '../img/delete2.png';
import { visibleAtom } from '../contexts/sideScreenAtom';
import { useAtom } from 'jotai';
import closebutton from '../img/closebutton.png';
import { useRef, useState } from 'react';
import * as S from '../styles/SideScreenStyled';
import { useNavigate } from 'react-router-dom';

const SidebarScreen = () => {
  const [inputText, setInputText] = useState<string>('');
  const [_, setVisibleValue] = useAtom(visibleAtom);

  const editorRef = useRef<HTMLDivElement>(null);

  //사이드 스크린 상태 변수 변경 함수
  const toggleFunc = (event: React.MouseEvent) => {
    setVisibleValue(prev => !prev);
    event.stopPropagation();
  };

  const onInputHandler = (event: React.SyntheticEvent<HTMLDivElement>) => {
    setInputText((event.target as HTMLDivElement).innerText);
  };

  return (
    <S.SideScreenContainer onClick={toggleFunc}>
      <S.SideScreen
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <S.ImgWrapper>
          <img src={closebutton} alt="닫기 버튼" onMouseDown={toggleFunc} />
        </S.ImgWrapper>
        <header>
          <Flex gap="0.6785rem" margin="0 0 0.5rem 0">
            <Profile width="35px" height="35px" />
            <span>김신아</span>
          </Flex>
          <S.TitleContainer>
            <input placeholder="제목을 입력해주세요" />
            <Flex gap="0.5625rem">
              <img src={edit} alt="편집 버튼" />
              <img src={trash} alt="휴지통 버튼" />
            </Flex>
          </S.TitleContainer>
          <hr></hr>
        </header>

        <S.TextEditingWrapper
          contentEditable
          onInput={onInputHandler}
          ref={editorRef}
        ></S.TextEditingWrapper>
      </S.SideScreen>
    </S.SideScreenContainer>
  );
};
export default SidebarScreen;
