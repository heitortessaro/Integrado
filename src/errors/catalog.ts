export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
  InvalidNewData = 'InvalidNewData',
}

// obj used to construct the API response
type ErrorResponseObject = {
  message: string,
  httpStatus: number,
};

export type ErrorCatalog = {
  // each object key is a key for the enum ErrorTypes
  // and each value is an API response object
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  InvalidNewData: {
    message: 'Invalid new data. An equal register already exists in the database',
    httpStatus: 400,
  },
};