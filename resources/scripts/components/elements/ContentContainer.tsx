import styled from 'styled-components';
import { breakpoint } from '@/theme';
import tw from 'twin.macro';

const ContentContainer = styled.div`
    max-width: 3000px;
    ${tw`mx-4`}

    ${tw`mx-20`};
    padding-left: 250px;

    @media (max-width: 1300px) {
      padding-left: 200px;
    }

    @media (max-width: 1600px) {
      ${tw`mx-4`};
    }

    @media (max-width: 700px) {
      padding-left: 0px;
    }
`;
ContentContainer.displayName = 'ContentContainer';

export default ContentContainer;
