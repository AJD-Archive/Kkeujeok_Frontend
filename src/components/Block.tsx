import Flex from './Flex';
import edit from '../assets/images/edit.png';
import deleteicon from '../assets/images/delete.png';
import profile from '../assets/images/kakoprofileimage.png';
import * as S from '../styles/DashboardStyled';

const Block = () => {
  return (
    <S.BlockContainer>
      <Flex gap="6px" justifyContent="flex-end">
        <S.ImageIconWrapper>
          <img src={edit} alt="편집 버튼" />
        </S.ImageIconWrapper>
        <S.ImageIconWrapper>
          <img src={deleteicon} alt="편집 버튼" />
        </S.ImageIconWrapper>
      </Flex>
      <Flex justifyContent="space-between" margin="0 0 8px 0">
        <h3>빨래하기</h3>
        <span>D-10</span>
      </Flex>
      {/* <p>집에서 빨래 바구니의 옷을 가지고 세탁실에...</p> */}
      <Flex>
        <S.ProfileImageWrapper>
          <img src={profile} />
        </S.ProfileImageWrapper>
        <span>명디우</span>
      </Flex>
    </S.BlockContainer>
  );
};
export default Block;
