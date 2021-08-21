import React from 'react';
import { Button, Col, Divider, Layout, Row } from 'antd';

export const StartPage = () => {
  return (
    <Layout.Content>
      <Row justify="center">
        <Divider />
        <Col>
          <Button onClick={()=> window.Main.openFile()}>Import</Button>
        </Col>
      </Row>
    </Layout.Content>
  );
}
