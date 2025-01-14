import { Injectable, Logger } from '@nestjs/common';
import { Partida } from './interfaces/partida.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ranking } from './interfaces/ranking.schema';
import { RpcException } from '@nestjs/microservices';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class RankingsService {
  private readonly logger = new Logger(RankingsService.name);

  constructor(
    @InjectModel('Ranking') private readonly desafioModel: Model<Ranking>,
    private clientProxySmartRanking: ClientProxySmartRanking,
  ) {}

  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyAdminBackEndInstance();

  async processarPartida(idPartida: string, partida: Partida): Promise<void> {
    try {
      const categoria: Categoria = await this.clientAdminBackend.send(
        'consultar-categorias',
        partida.categoria,
      );

      await Promise.all(
        partida.jogadores.map(async (jogador) => {
          const ranking = new this.desafioModel();

          ranking.categoria = partida.categoria;
          ranking.desafio = partida.desafio;
          ranking.partida = idPartida;
          ranking.jogador = jogador;

          if (jogador == partida.def) {
            ranking.evento = 'VITORIA';
            ranking.pontos = 30;
            ranking.operacao = '+';
          } else {
            ranking.evento = 'DERROTA';
            ranking.pontos = 0;
            ranking.operacao = '+';
          }

          await ranking.save();
        }),
      );
    } catch (error) {
      this.logger.error('Erro ao processar a partida', error.stack);
      throw new RpcException(error.message);
    }
  }
}
