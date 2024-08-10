import Profile from './Profile';
import Flex from './Flex';
import edit from '../img/edit.png';
import trash from '../img/delete2.png';
import * as S from '../styles/SideScreenStyled';

const SidebarScreen = () => {
  return (
    <S.SideScreenContainer>
      <S.SideScreen>
        <header>
          <Flex gap="0.6785rem" margin="0 0 0.5rem 0">
            <Profile width="35px" height="35px" />
            <span>김신아</span>
          </Flex>
          <S.TitleContainer>
            <h1>기능 명세서</h1>
            <Flex gap="0.5625rem">
              <img src={edit} alt="편집 버튼" />
              <img src={trash} alt="휴지통 버튼" />
            </Flex>
          </S.TitleContainer>
          <hr></hr>
        </header>

        <section>
          <textarea></textarea>
        </section>
      </S.SideScreen>
    </S.SideScreenContainer>
  );
};
export default SidebarScreen;
