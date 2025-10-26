import { useAtom } from 'jotai';

import { visibleAtom } from '../contexts/sideScreenAtom';
import fileimg from '../img/fileimg.png';
import * as S from '../styles/TeamDocumentStyled';
import Flex from './Flex';
type Props = {
  caption: string;
};
const File = ({ caption }: Props) => {
  const [_, setVisibleValue] = useAtom(visibleAtom);

  const toggleFunc = () => {
    setVisibleValue((prev) => !prev);
  };
  return (
    <S.FileImgWrapper>
      <Flex flexDirection='column' justifyContent='center'>
        <img alt='파일 이모티콘' src={fileimg} onClick={toggleFunc} />
        <span>{caption}</span>
      </Flex>
    </S.FileImgWrapper>
  );
};
export default File;
