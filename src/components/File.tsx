import fileimg from '../img/fileimg.png';
import Flex from './Flex';
import * as S from '../styles/TeamDocumentStyled';
import { visibleAtom } from '../contexts/sideScreenAtom';
import { useAtom } from 'jotai';
type Props = {
  caption: string;
};
const File = ({ caption }: Props) => {
  const [_, setVisibleValue] = useAtom(visibleAtom);

  const toggleFunc = () => {
    setVisibleValue(prev => !prev);
  };
  return (
    <S.FileImgWrapper>
      <Flex flexDirection="column" justifyContent="center">
        <img src={fileimg} alt="파일 이모티콘" onClick={toggleFunc} />
        <span>{caption}</span>
      </Flex>
    </S.FileImgWrapper>
  );
};
export default File;
