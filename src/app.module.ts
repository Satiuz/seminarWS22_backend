import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as toJson from '@meanie/mongoose-to-json';

import { Connection } from 'mongoose';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Todo, TodoSchema } from './todo.schema';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/todo'; // TODO Find a way to set process.env.MONGO_URI for deployment (Docker + GitHub)

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: mongoUri,
        connectionFactory: (connection: Connection) => {
          return connection.plugin(toJson);
        },
      }),
    }),
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
