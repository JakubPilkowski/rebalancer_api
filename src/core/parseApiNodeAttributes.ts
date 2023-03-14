import { Document, Types } from 'mongoose';

import IApiNodeAttributes from './IApiNodeAttributes';
import IModelAttributes from './IModelAttributes';

type EntityDocument = Document<unknown, any, IModelAttributes> & IModelAttributes;

type EntitySubdocument = Types.Subdocument & IModelAttributes;

export default function parseApiNodeAttributes(
  document: EntityDocument | EntitySubdocument
): IApiNodeAttributes {
  const { id, createdAt, updatedAt } = document;

  return {
    id,
    createdAt: new Date(createdAt).toISOString(),
    updatedAt: new Date(updatedAt).toISOString(),
  };
}
