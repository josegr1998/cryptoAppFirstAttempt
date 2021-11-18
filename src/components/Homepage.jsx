import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  //Bascially it renders the component, on the initial render isFetching is true, once it finishes fetching
  //triggers a re-render and logs the data
  const globalStats = data?.data?.stats;

  console.log(data);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      <Title level={2} className='heading'>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title='Total Cryptocurrencies' value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Exchanges'
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Markect Cap'
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total 24h Volume'
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Markets'
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className='show-more'>
          <Link to='/cryptocurrencies'>Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />

      {/*para reenderizar 10 en mi proyecto puedo pasar un array simplificado usando slice y pasarlo por props */}
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Latest Crypto News
        </Title>
        <Title level={3} className='show-more'>
          <Link to='/news'>Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
