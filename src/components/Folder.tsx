import folderimg from '../img/folderimg.png';
import Flex from './Flex';
import { useNavigate } from 'react-router-dom';
import * as S from '../styles/TeamDocumentStyled';

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
      <Flex justifyContent="center" flexDirection="column">
        <img src={folderimg} alt="폴더 이미지" onClick={handleNavigate} />
        <span>{caption}</span>
      </Flex>
    </S.FolderItmeContainer>
  );
};
export default Folder;
