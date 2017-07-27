import { whilstAsync } from './async-helper';
import { tcpDelimiter, dataDelimiter, ESCAPE } from '../../config';

/*
  @param {Buffer} dataBuffer - The buffer that is being checked.
  @return {Integer} - The index of the first occurence of an unescaped delimiter.
    Returns -1 if not found.
*/
export const getUnescapedDelimiterIndex = (data, delimiter = tcpDelimiter) => {
  return new Promise(async (resolve, reject) => {
    let currentOffset = 0;
    let index = -1;
    await whilstAsync(() =>
      currentOffset < data.byteLength,
    (callback) => {
      const escIndex = data.indexOf(ESCAPE, currentOffset);
      const delimiterIndex = data.indexOf(delimiter, currentOffset);

      // If no delimiter then its done.
      if (delimiterIndex === -1) {
        currentOffset = data.byteLength;
        index = -1;
        return callback(null);
      }

      // From here on, there is a delimiter somewhere.
      // If no escape or escape is after delimiter then delimiter is found.
      if (escIndex === -1 || escIndex > delimiterIndex) {
        index = delimiterIndex;
        currentOffset = data.byteLength;
        return callback(null);
      }

      // Escape is before delimiter. Modify offset and repeat.
      currentOffset = escIndex + 2;

      return callback(null);
    });
    resolve(index);
  });
};

/*
  Wrapper for data delimiter.
*/
export const getUnescapedDataDelimiterIndex = data =>
  getUnescapedDelimiterIndex(data, dataDelimiter);

export const stripEscapes = async (data) => {
  let strippedData = Buffer.from([]);
  let currentOffset = 0;
  await whilstAsync(() =>
    currentOffset >= 0 && currentOffset < data.byteLength,
  (callback) => {
    const escapeIndex = data.indexOf(ESCAPE, currentOffset);
    if (escapeIndex === -1) {
      strippedData = Buffer.concat([strippedData, data.slice(currentOffset)]);
      currentOffset = data.byteLength;
      return callback(null);
    }
    strippedData = Buffer.concat([strippedData, data.slice(currentOffset, escapeIndex),
      Buffer.from([data[escapeIndex + 1]])]);
    currentOffset = escapeIndex + 2;
    return callback(null);
  });
  return strippedData;
};

// Helper for escaping data.
export const sendEscapedObjectWithoutData = async (obj, socket) => {
  const buf = Buffer.from(JSON.stringify(obj), 'utf8');
  let escapedData = Buffer.from([]);
  let currentOffset = 0;
  await whilstAsync(() =>
    currentOffset < buf.byteLength,
  (callback) => {
    const escapeIndex = buf.indexOf(ESCAPE, currentOffset);
    const tcpIndex = buf.indexOf(tcpDelimiter, currentOffset);
    const dataIndex = buf.indexOf(dataDelimiter, currentOffset);
    const presentIndices = [];
    if (escapeIndex !== -1) presentIndices.push(escapeIndex);
    if (tcpIndex !== -1) presentIndices.push(tcpIndex);
    if (dataIndex !== -1) presentIndices.push(dataIndex);
    if (presentIndices.length === 0) {
      escapedData = Buffer.concat([escapedData, buf.slice(currentOffset)]);
      currentOffset = buf.byteLength;
      return callback(null);
    }
    const smallestIndex = Math.min(...presentIndices);
    escapedData = Buffer.concat([escapedData, buf.slice(currentOffset, smallestIndex),
      ESCAPE, Buffer.from([buf[smallestIndex]])]);
    currentOffset = smallestIndex + 1;
    return callback(null);
  });
  return socket.write(Buffer.concat([escapedData, tcpDelimiter]));
};

/*
  @param {Buffer} data - The buffer that contains JSON data. Does not
    contain the ending delimiter.
  @return {Object} - The result of the parse. The result object contains:
    1) success {Boolean} - whether the parse was succesful.
*/
export const dataParser = async (data) => {
  let parsedData;
  try {
    parsedData = JSON.parse(data.toString('utf8'));
  } catch (err) {
    console.log('An error has occured while parsing JSON data.');
    console.log(err);
    return { success: false };
  }
  return { success: true, parsedJson: parsedData };
};
