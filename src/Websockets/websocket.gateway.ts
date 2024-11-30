import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UpdateTurnDto } from 'src/turn/dto/update-turn.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('turnoNuevo')
  handleNuevoTurno(client: Socket, turnoData: any) {
    this.server.emit('turnoActualizado', turnoData);
  }

  @SubscribeMessage('turnoAtendiendo')
  handleTurnoAtendido(turnoData: UpdateTurnDto) {
    this.server.emit('turnoAtendiendo', turnoData);
  }
}
