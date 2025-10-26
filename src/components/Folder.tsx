import { useNavigate } from 'react-router-dom';

import folderimg from '../img/folderimg.png';
import * as S from '../styles/TeamDocumentStyled';
import Flex from './Flex';

type Props = {
  caption: string;
};
const Folder = ({ caption }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('1'); // 상대 경로로 이동 `1`은 추후에 서버에서 받아오는 id값으로 대체할 예정임
  };

  return (
    <S.FolderItmeContainer>
      <Flex flexDirection='column' justifyContent='center'>
        <img alt='폴더 이미지' src={folderimg} onClick={handleNavigate} />
        <span>{caption}</span>
      </Flex>
    </S.FolderItmeContainer>
  );
};
export default Folder;
