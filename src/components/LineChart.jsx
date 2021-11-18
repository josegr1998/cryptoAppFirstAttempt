import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = (props) => {
  const { coinHistory, currentPrice, coinName } = props;
  console.log(coinHistory, currentPrice, coinName);
  //programar para que cuando la variacion sea menor a 0 el porcentaje este en rojo y cuando sea mayor este en verde

  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleString()
    );
  }

  console.log(coinPrice, coinTimestamp);
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>
          {coinName} Price Chart
          <Col className='price-container'>
            <Title level={5} className='price-change'>
              {coinHistory?.data?.change} %
            </Title>
            <Title level={5} className='current-price'>
              Current {coinName} price ${currentPrice}
            </Title>
          </Col>
        </Title>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
