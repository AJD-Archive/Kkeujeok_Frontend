import { Link } from 'react-router-dom';
import Flex from '../components/Flex';
import * as S from '../styles/TeamDocumentStyled';

type Props = {
  documentId: string;
  title?: string;
  category?: string;
  name?: string;
  profileImg?: string;
  content?: string;
};

const DocumentCard = ({ documentId }: Props) => {
  return (
    <S.DocumentComponent>
      <Link to={`${documentId}`}>
        <S.DocumentCard>
          <S.DocumentCategory>카테고리</S.DocumentCategory>
          <S.DocumentTitle>제목</S.DocumentTitle>
          <Flex>
            <S.DocumentWriterImg></S.DocumentWriterImg>
            <S.DocumnetWriter>작성자</S.DocumnetWriter>
          </Flex>
        </S.DocumentCard>
      </Link>
    </S.DocumentComponent>
  );
};
export default DocumentCard;
