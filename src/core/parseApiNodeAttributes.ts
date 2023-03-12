import { Document } from 'mongoose';
import IApiNodeAttributes from './IApiNodeAttributes';
import IModelAttributes from './IModelAttributes';

type EntityDocument = Document<unknown, any, IModelAttributes> & IModelAttributes;

export default function parseApiNodeAttributes(document: EntityDocument): IApiNodeAttributes {
  const { id, createdAt, updatedAt } = document;

  return {
    id,
    createdAt: new Date(createdAt).toISOString(),
    updatedAt: new Date(updatedAt).toISOString(),
  };
}
