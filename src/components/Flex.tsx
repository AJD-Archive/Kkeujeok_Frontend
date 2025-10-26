import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';

interface FlexProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  gap?: CSSProperties['gap'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];
  flexWrap?: CSSProperties['flexWrap'];
  flexGrow?: CSSProperties['flexGrow'];
}

const StyledFlex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  gap: ${({ gap }) => (typeof gap === 'number' ? `${gap}px` : gap)};
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : (width ?? 'auto'))};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : (height ?? 'auto'))};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  flex-grow: ${({ flexGrow }) => flexGrow};
`;

export default function Flex({
  children,
  flexDirection = 'row',
  justifyContent = 'flex-start',
  alignItems = 'center',
  gap = '0px',
  width,
  height,
  flexGrow,
  margin,
  padding,
  flexWrap,
  ...rest
}: FlexProps) {
  return (
    <StyledFlex
      alignItems={alignItems}
      flexDirection={flexDirection}
      flexGrow={flexGrow}
      flexWrap={flexWrap}
      gap={gap}
      height={height}
      justifyContent={justifyContent}
      margin={margin}
      padding={padding}
      width={width}
      {...rest}
    >
      {children}
    </StyledFlex>
  );
}
