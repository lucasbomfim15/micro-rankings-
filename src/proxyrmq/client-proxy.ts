import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ClientProxySmartRanking {
  getClientProxyAdminBackEndInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin123@localhost:5672/smartranking'],
        queue: 'admin-backend',
      },
    });
  }

  getClientProxyDesafiosInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin123@localhost:5672/smartranking'],
        queue: 'desafios',
      },
    });
  }

  getClientProxyRankingsInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin123@localhost:5672/smartranking'],
        queue: 'rankings',
      },
    });
  }

  getClientProxyNotificacoesInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin123@localhost:5672/smartranking'],
        queue: 'notificacoes',
      },
    });
  }
}
