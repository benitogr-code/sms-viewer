import React, { useState } from 'react';
const { ChatList, MessageList } = require('react-chat-elements');
import { Layout } from 'antd';
import { Conversation } from '../model/conversation';

interface ChatPageProps {
  conversations: Conversation[];
}

export const ChatPage = (props: ChatPageProps) => {
  const [conversationId, setConversationId] = useState('');
  const selectedConversation = props.conversations.find((conversation) => conversation.phone === conversationId);

  return (
    <React.Fragment>
      <Layout.Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        theme="light"
        width="25%"
      >
        <ChatList
          dataSource={
            props.conversations.map((conversation) => {
              const message = conversation.messages[conversation.messages.length - 1];
              const unknownContact = conversation.name.includes('Unknown');
              const title = unknownContact ? conversation.phone : conversation.name;
              const alt = unknownContact ? '?' : conversation.name.substr(0, 2).toUpperCase();

              return {
                id: conversation.phone,
                letterItem: { id: conversation.phone, letter: alt },
                alt: alt,
                title: title,
                subtitle: `${conversation.messages.length} messages`,
                date: new Date(message.time),
                unread: 0,
              };
            }).sort((c1, c2) => c1.date <= c2.date ? 1 : -1)
          }
          onClick={(item: any) => setConversationId(item.id)}
        />
      </Layout.Sider>
      <Layout.Content style={{ marginLeft: '25%' }}>
        <MessageList
          dataSource={
            selectedConversation?.messages.map((message) => {
              return {
                position: message.outbound ? 'right' : 'left',
                type: 'text',
                text: message.body,
                date: new Date(message.time),
                title: message.outbound ? 'Me' : selectedConversation.name
              };
            })
          }
        />
      </Layout.Content>
    </React.Fragment>
  );
}
