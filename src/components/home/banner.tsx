import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import Sticky from 'components/common/sticky';

const Banner: FC = observer(() => {
  return (
    <Sticky topOffset={50}>
      <StyledDiv>
        <span>
          Shop 3 products and get the cheapest one for <strong>FREE!</strong>
        </span>
      </StyledDiv>
    </Sticky>
  );
});

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  font-size: 13px;
  font-family: Avenir;
  color: #fff;
  background: linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(137, 137, 137) 100%);
`;

export default Banner;
