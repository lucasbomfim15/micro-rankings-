import { Module } from '@nestjs/common';
import { RankingsModule } from './rankings/rankings.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';

@Module({
  imports: [
    RankingsModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin_sr:kdWcpu1jWvUSlU6Y@clustermogodb-79l5n.mongodb.net/srranking?retryWrites=true&w=majority',
    ),
    ProxyRMQModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
