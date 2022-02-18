import styled from "styled-components";

export const RightHandSide = styled.div``;

export const Metrics = styled.div``;

export const Metric = styled.div`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;

  h5 {
    font-weight: 100;
    margin: 0;
  }

  h3 {
    font-weight: 600;
    margin-top: 0;
  }

  h4 {
    font-weight: 300;
    margin: 0;
  }

  .buckets {
    display: flex;
  }
`;
