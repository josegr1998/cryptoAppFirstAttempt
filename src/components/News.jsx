import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);

  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  console.log(cryptoNews);
  if (!cryptoNews?.value) {
    return <Loader />;
  }
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          {/*this is a pretty good looking select */}
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {/*in the first option it will fetch info about cryptocurrency, selecting options if will fetch about a specific crypto */}
            <Option value='Cryptocurrency'>All</Option>
            {data.data.coins.map((coin) => {
              return <Option value={`${coin.name}`}>{coin.name}</Option>;
            })}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card>
            <a href={news.url} target='_blank'>
              <div className='news-image-container'>
                <Title className='news-title' level={4}>
                  {news.name}
                  {/*show demo image in my actual project */}
                  <img
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                    src={news?.image?.thumbnail?.contentUrl || ""}
                    alt='news'
                  />
                </Title>
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : `${news.description}`}
              </p>
              <div className='provider-container'>
                {/*show demo image in my actual project */}
                <Avatar
                  src={news.provider[0]?.image?.thumbnail?.contentUrl || ""}
                />
                <Text className='provider-name'>{news.provider[0]?.name}</Text>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
