// for components to interact with connection
import ConnectionManager from '../../connectionManager';
connectionManager = new ConnectionManager();

export function connectToServer() {
  connectionManager.connectToHost();
}

export function disconnectFromServer() {
  connectionManager.deinitialize();
}
