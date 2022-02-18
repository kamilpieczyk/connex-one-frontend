import React, { useEffect, useCallback, useState } from "react";
import { SpinnerDotted } from "spinners-react";
import parsePrometheus from "parse-prometheus-text-format";

import { RightHandSide, Metrics, Metric } from "./style";

interface MetricType {
  help: string;
  metrics: any[];
  name: string;
  type: string;
}

const RightHandSideComponent: React.FC<{}> = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [metrics, setMetrics] = useState<MetricType[]>([]);

  const getMetrics = useCallback(async () => {
    if (!isLoading) setLoading(true);
    try {
      const data = await fetch("http://localhost:3030/metrics", {
        headers: {
          Authorization: "Bearer mysecrettoken",
        },
      });
      const response = await data.text();
      setMetrics(parsePrometheus(response));
      setLoading(false);
    } catch (err) {}
  }, []);

  useEffect(() => {
    getMetrics();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getMetrics();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <RightHandSide>
      {isLoading ? (
        <SpinnerDotted color="white" />
      ) : (
        <Metrics>
          {metrics.map((metric: MetricType) => (
            <Metric key={metric.name + metric.help}>
              <h5>{metric.type}</h5>
              <h3>{metric.name}</h3>
              <h4>{metric.help}</h4>
              <div>
                {metric.metrics.map((metricValue) => (
                  <React.Fragment>
                    <p>{metricValue.value}</p>
                    <p>{metricValue.buckets && metricValue.buckets[0]}</p>
                    {metricValue.buckets &&
                      Object.keys(metricValue.buckets).map((ObjKey) => (
                        <div className="buckets">
                          <strong>{ObjKey}:</strong>{" "}
                          {metricValue.buckets[ObjKey]}
                        </div>
                      ))}
                  </React.Fragment>
                ))}
              </div>
            </Metric>
          ))}
        </Metrics>
      )}
    </RightHandSide>
  );
};

export default RightHandSideComponent;
