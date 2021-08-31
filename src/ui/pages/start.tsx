import React, { useState } from 'react';
import { Button, Col, Empty, Layout, notification, Row, Spin } from 'antd';
import { useAppDispatch } from '../store';
import { setConversations } from '../store/conversations';
import { importSmsBackup } from '../utils/importer';

const FILE_FILTERS = [
  { name: 'Xml', extensions: ['xml'] },
];

export const StartPage = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const onClickHandler = async () => {
    const file = await window.Main.openFile({ filters: FILE_FILTERS });
    if (!file.data)
      return;

    setLoading(true);
    const importedConversations = importSmsBackup(file.data);
    setLoading(false);

    if ((importedConversations === null) || (importedConversations.length === 0)) {
      notification.error({
        message: 'Import error',
        description: 'Failed to load SMS conversations from selected file.',
      });
      return;
    }

    dispatch(setConversations(importedConversations));
  };

  return (
    <Layout.Content>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col>
          <Empty description="Import conversations from SMS Backup file">
            <Spin tip="Loading" spinning={loading}>
              <Button onClick={onClickHandler} disabled={loading} >Import</Button>
            </Spin>
          </Empty>
        </Col>
      </Row>
    </Layout.Content>
  );
}
