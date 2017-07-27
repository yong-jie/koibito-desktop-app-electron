import net from 'net';
import { whilstAsync } from './helpers/async-helper';
import { getUnescapedDelimiterIndex, getUnescapedDataDelimiterIndex, stripEscapes,
  dataParser, sendEscapedObjectWithoutData } from './helpers/data-parser';
import { ESCAPE, tcpDelimiter, dataDelimiter, credentials } from '../config';

export default class ConnectionManager {
  constructor() {
    this.socket = null;
    this.connected = false;
    this.buffer = Buffer.from([]);
  }

  /*
    @param {Object} callbacks - All callbacks needed before the connection manager connects.
  */
  bindCallbacks(callbacks) {
    if (callbacks.pushMessage) {
      this.pushMessage = callbacks.pushMessage;
    }
    this.connectToHost();
  }

  connectToHost() {
    try {
      this.socket = net.createConnection({ host: 'api.koibito.cloudy.moe', port: 3002 }, () => {
        console.log('Connected to server!');
        this.connected = true;
      });
    } catch (err) {
      console.log('Error while connecting to server. Retrying in 10 sec.');
      this.socket = null;
      return setTimeout(() => this.connectToHost(), 10000);
    }

    this.socket.on('data', async (data) => {
      console.log('Data received.');
      this.buffer = Buffer.concat([this.buffer, data]);
      let unescapedDelimiterIndex = await getUnescapedDelimiterIndex(this.buffer);

      if (unescapedDelimiterIndex < 0) {
        return 0;
      }

      // Repeatedly split buffer according to delimiter, then parse and process.
      let breakAndEndSocket = false;
      await whilstAsync(() =>
        unescapedDelimiterIndex >= 0 && !breakAndEndSocket,
      async () => {
        let currentBufferRegion = this.buffer.slice(0, unescapedDelimiterIndex);
        if (unescapedDelimiterIndex === this.buffer.byteLength - 1) {
          this.buffer = Buffer.from([]);
        } else {
          this.buffer = this.buffer.slice(unescapedDelimiterIndex + 1);
        }
        // Current data region now excludes tcpdelimiter at the end.
        unescapedDelimiterIndex = await getUnescapedDelimiterIndex(this.buffer);
        const dataDelimiterIndex = await getUnescapedDataDelimiterIndex(currentBufferRegion);
        let dataRegion = Buffer.from([]);
        if (dataDelimiterIndex !== -1) {
          // There is a data delimiter. Further splitting.
          dataRegion =
            currentBufferRegion.slice(dataDelimiterIndex + 1, currentBufferRegion.byteLength);
          currentBufferRegion = currentBufferRegion.slice(0, dataDelimiterIndex);
          dataRegion = await stripEscapes(dataRegion);
        }
        currentBufferRegion = await stripEscapes(currentBufferRegion);
        let parseResult = await dataParser(currentBufferRegion);
        if (parseResult.success === false) {
          breakAndEndSocket = true;
          return 0;
        }
        parseResult = parseResult.parsedJson;
        if (dataDelimiterIndex !== -1) {
          parseResult.rawData = dataRegion;
        }
        breakAndEndSocket = !(await this.processReceivedMessage(parseResult));
        return 0;
      });
      if (breakAndEndSocket) return socket.end();
    });

    this.socket.on('end', () => {
      console.log('Connection closed.');
      this.socket.end();
    });

    sendEscapedObjectWithoutData({action:'login', username: credentials.username}, this.socket);
  }

  /*
    Returns true if no errors occured.
  */
  processReceivedMessage(obj) {
    if (obj.action && obj.action === 'new message') {
      // Check all required fields present.
      if (!obj.message || !obj.sender) return false;
      this.pushMessage({sender: obj.sender, message: obj.message, time: obj.time});
      return true;
    }
  }

  sendMessage(obj) {
    if (!this.connected) return 0;
    sendEscapedObjectWithoutData(obj, this.socket);
  }

  deinitialize() {
    if (this.connected) {
      this.socket.end();
      this.socket = null;
      this.connected = false;
    }
    this.buffer = null;
  }
};
