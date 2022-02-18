import React, { useEffect, useCallback, useState } from "react";
import { SpinnerDotted } from "spinners-react";

import { RightHandSide, Metrics } from "./style";

const RightHandSideComponent: React.FC<{}> = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [metrics, setMetrics] = useState<string>("");

  const getMetrics = useCallback(async () => {
    try {
      const data = await fetch("http://localhost:3030/metrics", {
        headers: {
          Authorization: "Bearer mysecrettoken",
        },
      });
      const response = await data.text();
      setMetrics(response);
      setLoading(false);
    } catch (err) {}
  }, []);

  useEffect(() => {
    getMetrics();
  }, []);

  return (
    <RightHandSide>
      {isLoading ? (
        <SpinnerDotted color="white" />
      ) : (
        <Metrics>{metrics}</Metrics>
      )}
    </RightHandSide>
  );
};

export default RightHandSideComponent;
