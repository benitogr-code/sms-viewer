import React from 'react';
import ReactJson from 'react-json-view'
import { Button, Col, Divider, Layout, Row } from 'antd';
import { useAppSelector, useAppDispatch } from '../store';
import { setConversations } from '../store/conversations';
import { importSmsBackup } from '../utils/importer';

const FILE_FILTERS = [
  { name: 'Xml', extensions: ['xml'] },
];

export const StartPage = () => {
  const conversations = useAppSelector((state) => state.conversations.data);
  const dispatch = useAppDispatch();

  const onClickHandler = async () => {
    const file = await window.Main.openFile({ filters: FILE_FILTERS });
    if (!file.data)
      return;

    const importedConversations = importSmsBackup(file.data);
    if (!importedConversations)
      return;

    dispatch(setConversations(importedConversations));
  };


  return (
    <Layout.Content>
      <Row justify="center">
        <Divider />
        <Col>
          <Button onClick={onClickHandler}>Import</Button>
        </Col>
      </Row>
      <React.Fragment>
        {
          conversations.map((conversation, index) => {
            return (
              <div key={index}>
                <Divider />
                <ReactJson
                  name={`${conversation.name} (${conversation.phone})`}
                  displayDataTypes={false}
                  collapsed={1}
                  enableClipboard={false}
                  src={conversation}
                />
              </div>
            );
          })
        }
      </React.Fragment>
    </Layout.Content>
  );
}
