const {
  BlobServiceClient,
  StorageSharedKeyCredential
} = require('@azure/storage-blob');

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

const sharedKeyCredential =
  new StorageSharedKeyCredential(accountName, accountKey);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

const containerName = 'app-media';

module.exports = {
  blobServiceClient,
  containerName,
  sharedKeyCredential,
  accountName
};
