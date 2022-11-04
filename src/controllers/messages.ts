enum WssActions {
  Open = 'open',
  Close = 'close',
  Message = 'message',
  Error = 'error',
}
enum WssMessageTypes {
  Ping = 'ping',
  Pong = 'pong',
  Message = 'message',
  GetOld = 'get old',
  UserConnected = 'user connected'
}
class MessagesController {
  private wss: WebSocket | null = null;
  private ping: any;
  private chatId: number | null = null;

  constructor() {
    this._wssClose = this._wssClose.bind(this);
    this._wssMessage = this._wssMessage.bind(this);
    this._wssOpen = this._wssOpen.bind(this);
    this._wssError = this._wssError.bind(this);
  }

  private _wssMessage(event: Indexed) {
    const messages = JSON.parse(event.data);

    // Todo: fix 'userConnected' message
    if (messages.type !== WssMessageTypes.Pong && messages.type !== WssMessageTypes.UserConnected) {
      if (Array.isArray(messages)) {
        window.store.dispatch({
          messages: messages.reverse(),
        });
      } else {
        const storeMsgs = window.store.getState().messages;
        storeMsgs?.push(messages);

        window.store.dispatch({
          messages:  storeMsgs
        })
      }
    }
  }
  private _wssOpen () {
    if (this.wss) {
      this.getMessages();
      this.ping = setInterval(() => {
        this.wss?.send(JSON.stringify({ type: WssMessageTypes.Ping }));
      }, 5000);
    }
  }
  private _wssClose (event: any) {
    this._removeListeners();
    if (!event.wasClean) {
      throw Error('Somthing was break')
    }
  }
  private _addListeners() {
    if (this.wss) {
      this.wss.addEventListener(WssActions.Open, this._wssOpen);
      this.wss.addEventListener(WssActions.Close, this._wssClose);
      this.wss.addEventListener(WssActions.Message, this._wssMessage);
      this.wss.addEventListener(WssActions.Error, this._wssError);
    }
  }
  private _removeListeners() {
    if (this.wss) {
      this.wss.addEventListener(WssActions.Open, this._wssOpen);
      this.wss.addEventListener(WssActions.Close, this._wssClose);
      this.wss.addEventListener(WssActions.Message, this._wssMessage);
      this.wss.addEventListener(WssActions.Error, this._wssError);
    }
  }

  private _wssError(event: any) {
    throw Error(event.message);
  }
  private _close() {
    if (this.wss) {
      clearInterval(this.ping);
      this.wss.close();
      this._removeListeners();
    }
  }

  connect(userId: number, chatId: number, token: string ) {
    if (this.chatId !== chatId) {
      this._close();
      this.chatId = chatId;
      this.wss = new WebSocket(
        `${process.env.WSS_ENDPOINT}/${userId}/${chatId}/${token}`
      );
      this._addListeners();
    }
  }

  getMessages() {
    if (this.wss) {
      this.wss.send(
        JSON.stringify({
          content: '0',
          type: WssMessageTypes.GetOld,
        })
      );
    }
  }

  sendMessage(message: string) {
    if (this.wss) {
      this.wss?.send(
        JSON.stringify({
          content: message,
          type: WssMessageTypes.Message,
        })
      );
    }
  }
}

export default new MessagesController();
