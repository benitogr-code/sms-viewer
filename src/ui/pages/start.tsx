import React from 'react';
import { Button, Col, Divider, Layout, Row } from 'antd';

const FILE_FILTERS = [
  { name: 'Xml', extensions: ['xml'] },
];

export const StartPage = () => {
  const onClickHandler = async () => {
    const result = await window.Main.openFile({ filters: FILE_FILTERS });
    console.info('OpenFile result', result);
  };

  return (
    <Layout.Content>
      <Row justify="center">
        <Divider />
        <Col>
          <Button onClick={onClickHandler}>Import</Button>
        </Col>
      </Row>
    </Layout.Content>
  );
}
