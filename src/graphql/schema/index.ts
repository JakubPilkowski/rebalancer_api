import { readFileSync } from 'fs';

export default readFileSync('./src/graphql/schema/schema.graphql', { encoding: 'utf-8' });
