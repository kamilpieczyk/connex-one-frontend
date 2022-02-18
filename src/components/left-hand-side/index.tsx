import React, { useState, useCallback, useEffect } from "react";
import { SpinnerDotted } from "spinners-react";
import moment from "moment";

import { LeftHandSide, Time } from "./style";

interface ServerResponse {
  properties: {
    epoch: {
      description: number;
      type: string;
    };
  };
  required: string[];
  type: string;
}

const LeftHandSideComponent: React.FC<{}> = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [epoch, setEpoch] = useState<number>(0);
  const [clientEpoch, setClientEpoch] = useState<number>(0);
  const [difference, setDifference] = useState<string>("");

  const getTimeDifference = () => {
    const timeA = moment(epoch);
    const timeB = moment(clientEpoch);
    const seconds = timeB.diff(timeA, "seconds");
    setDifference(new Date(seconds * 1000).toISOString().substr(11, 8));
  };

  const getEpochTime = useCallback(async () => {
    try {
      const data = await fetch("http://localhost:3030/time", {
        headers: {
          Authorization: "Bearer mysecrettoken",
        },
      });
      const response: ServerResponse = await data.json();
      setEpoch(response.properties.epoch.description);
      setClientEpoch(Date.now());
      setInterval(() => {
        setClientEpoch(Date.now());
      }, 1000);
      setLoading(false);
    } catch (err) {}
  }, []);

  useEffect(() => {
    getEpochTime();
    const interval = setInterval(() => {
      getEpochTime();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    getTimeDifference();
  }, [clientEpoch]);

  return (
    <LeftHandSide>
      {isLoading ? (
        <SpinnerDotted color="white" />
      ) : (
        <Time>
          <h2>Server Epoch: {epoch}</h2>
          <h2>difference: {difference}</h2>
        </Time>
      )}
    </LeftHandSide>
  );
};

export default LeftHandSideComponent;
