import mongoose, { Connection } from 'mongoose';

type Options = {
  uri: string;
};

export default async function connectDatabase(options: Options): Promise<Connection> {
  const { uri } = { ...options };

  mongoose.set('strictQuery', false);

  await mongoose
    .connect(uri, {
      // those functions are right now set by default
      // useNewUrlParser: true,
      // useFindAndModify: false,
      // useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to mongodb database'))
    .catch((err: unknown) => console.error(err));

  return mongoose.connection;
}
