import { styled } from 'styled-components';
import theme from '../styles/Theme/Theme';
import Flex from './Flex';
import edit from '../assets/images/edit.png';
import deleteicon from '../assets/images/delete.png';
import profile from '../assets/images/kakoprofileimage.png';

const Block = () => {
  return (
    <BlockContainer>
      <Flex gap="6px" justifyContent="flex-end">
        <ImageIconWrapper>
          <img src={edit} alt="편집 버튼" />
        </ImageIconWrapper>
        <ImageIconWrapper>
          <img src={deleteicon} alt="편집 버튼" />
        </ImageIconWrapper>
      </Flex>
      <Flex justifyContent="space-between" margin="0 0 8px 0">
        <h3>빨래하기</h3>
        <span>D-10</span>
      </Flex>
      {/* <p>집에서 빨래 바구니의 옷을 가지고 세탁실에...</p> */}
      <Flex>
        <ProfileImageWrapper>
          <img src={profile} />
        </ProfileImageWrapper>
        <span>명디우</span>
      </Flex>
    </BlockContainer>
  );
};
export default Block;

const BlockContainer = styled.div`
  background: ${theme.color.white};
  padding: 0.625rem 1.375rem 1.25rem 1.375em;
  border: 1px solid #f4f4f4;
  border-radius: 10px;
  cursor: pointer;

  h3 {
    font-size: ${theme.font.size.main};
    font-weight: ${theme.font.weight.medium};
    color: ${theme.color.black};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5em;
    max-height: 3em;
    margin-right: 23px;
    flex: 2;
  }

  p {
    font-size: ${theme.font.size.caption};
    font-weight: ${theme.font.weight.light};
    color: ${theme.color.gray};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  span {
    font-size: ${theme.font.size.caption};
    color: ${theme.color.gray};
    font-weight: ${theme.font.weight.light};
  }

  &:hover {
    img {
      display: block;
    }
  }
`;

const ImageIconWrapper = styled.div`
  width: 10px;
  height: 10px;
  margin-bottom: 9px;
  img {
    display: none;
    width: inherit;
    height: auto;
  }
`;

const ProfileImageWrapper = styled.div`
  img {
    width: 21px;
    height: 21px;
    border-radius: 50%;
    margin-right: 5px;
  }
`;
