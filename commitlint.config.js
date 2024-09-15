module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-pattern': [2, 'always', /^\[#(\d+)\]\s(\w+):\s(.+)$/],
    'header-max-length': [2, 'always', 72],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 기능 (새로운 기능)
        'fix', // 버그 수정
        'docs', // 문서 (문서 추가, 수정, 삭제)
        'style', // 스타일 (코드 포맷팅, 세미콜론 추가: 비즈니스 로직에 변경 없음)
        'refactor', // 리팩토링 (프로덕션 코드 수정이 없는 경우)
        'perf', // 성능 개선
        'test', // 테스트 추가, 수정
        'chore', // 기타 변경사항 (빌드 스크립트 수정 등)
        'revert', // 커밋 되돌리기
        'build', // 빌드 관련 변경사항 (npm, yarn 등)
      ],
    ],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[#(\d+)\]\s(\w+):\s(.+)$/,
      headerCorrespondence: ['ticket', 'type', 'subject'],
    },
  },
};
