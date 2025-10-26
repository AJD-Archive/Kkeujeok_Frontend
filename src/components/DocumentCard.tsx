import { Link } from 'react-router-dom';

import Flex from '../components/Flex';
import * as S from '../styles/TeamDocumentStyled';
import type { TeamDocument } from '../types/TeamDocumentType';

type Props = {
  // documentId: string | undefined;
  // title?: string;
  // category?: string;
  // name?: string;
  // profileImg?: string;
  // content?: string;
  document: TeamDocument;
};

const DocumentCard = ({ document }: Props) => {
  return (
    <S.DocumentComponent>
      <Link to={`${document.teamDocumentId}`}>
        <S.DocumentCard>
          <S.DocumentCategory>{document.category}</S.DocumentCategory>
          <S.DocumentTitle>{document.title}</S.DocumentTitle>
          <Flex>
            <S.DocumentWriterImg>
              <img alt='프로필 사진' src={document.picture} />
            </S.DocumentWriterImg>
            <S.DocumnetWriter>{document.author}</S.DocumnetWriter>
          </Flex>
        </S.DocumentCard>
      </Link>
    </S.DocumentComponent>
  );
};
export default DocumentCard;
