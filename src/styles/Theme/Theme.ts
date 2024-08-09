const theme = {
  color: {
    black: '#000000',
    white: '#FFFFFF',
    main: '#4C8CFF',
    main2: '#9847FF',
    main3: '#00D1FF',
    text: '#2A2C30',
    gray: '#858585',
    lightGray: '#D1D1D1',
    navbar: '#F5F5F5',
    gradation: 'linear-gradient(90deg, #4C8CFF 0%, #9847FF 100%)',
    stroke2: '#F4F4F4',
  },
  borderRadius: {},
  font: {
    size: {
      mainTitle: '20px',
      main: '16px',
      caption: '12px',
    },
    weight: {
      light: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
    },
  },
  boxShadow: {
    default: '0px 0px 10px rgba(0, 0, 0, 0.03)',
  },
};

export type ThemeColor = keyof typeof theme.color;

export default theme;
