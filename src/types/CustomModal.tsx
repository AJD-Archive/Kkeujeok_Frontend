export interface CustomModalProps {
  title: string;
  subTitle: string;
  onClose?: () => void; // 모달이 닫힐 때 호출할 함수
  onYesClick: () => void; // '예' 버튼 클릭 시 호출할 함수
  onNoClick: () => void; // '아니오' 버튼 클릭 시 호출할 함수
}
