export default function ChatInputForm() {

  const s = useStates("main");

  async function sendMessage(event) {
    event.preventDefault();
    await fetch('/api/chat-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(s.newMessage)
    });
    s.userNameInputDisabled = true;
    s.newMessage.text = '';
  }

  return <form name="chat" className="container-fluid p-3 fixed-bottom" onSubmit={sendMessage}>
    <Row>
      <Col>
        <input className="form-control" name="userName" required
          disabled={s.userNameInputDisabled}
          placeholder="Username" {...s.newMessage.bind('userName')} />

        <div className="input-group mt-3">
          <input className="form-control" name="text" required
            placeholder="Message" {...s.newMessage.bind('text')} />
          <button className="btn btn-info" type=" submit" id="button-addon2">Send</button>
        </div>
      </Col>
    </Row>
  </form >;
}