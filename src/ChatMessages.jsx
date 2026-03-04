export default function ChatMessages(s) {
  return <div className="chat-messages">
    {s.chatMessages.map(({ timestamp, userName, text }) => <>
      <Row>
        <Col>
          <div className={'alert w-75 '
            + (userName === s.newMessage.userName ? 'alert-primary float-end' : 'alert-secondary')}>
            <b>{userName}</b><span className="float-end">{new Date(timestamp).toLocaleTimeString()}</span><br />
            {text}
          </div>
        </Col>
      </Row>
    </>)}
  </div>;
}