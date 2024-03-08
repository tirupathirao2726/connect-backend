import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway()
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() io: Server;

  afterInit(server: any) {
    console.log(`${server} is initialized`);
  }

  handleConnection(client: Socket) {
    const { sockets } = this.io.sockets;

    console.log(`Client id: ${client?.id} connected `, client);
    console.log(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliend id:${client.id} disconnected`);
  }
  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: any) {
    console.log('subscribed message event', client, payload);
  }
}
