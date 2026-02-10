const {
  generateBlobSASQueryParameters,
  SASProtocol,
  BlobSASPermissions
} = require('@azure/storage-blob');

const {
  containerName,
  sharedKeyCredential,
  accountName
} = require('./database/blob.config');

const POLICY_NAME = 'readpolicy';

function generateReadSAS(blobName) {
  const sasToken = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse('r'),
      expiresOn: new Date(Date.now() + 60 * 60 * 1000)
    },
    sharedKeyCredential
  ).toString();

  return `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;
}

module.exports = {
  generateReadSAS
};
