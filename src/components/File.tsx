import fileimg from '../img/fileimg.png';
import Flex from './Flex';
import * as S from '../styles/TeamDocumentStyled';

type Props = {
  caption: string;
};
const File = ({ caption }: Props) => {
  return (
    <S.FileImgWrapper>
      <Flex flexDirection="column" justifyContent="center">
        <img src={fileimg} alt="파일 이모티콘" />
        <span>{caption}</span>
      </Flex>
    </S.FileImgWrapper>
  );
};
export default File;
