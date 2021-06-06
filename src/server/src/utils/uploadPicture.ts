/* eslint-disable */
import AWS from 'aws-sdk';
import fs from 'fs';

export const S3 = new AWS.S3({
  signatureVersion: 's3v4',
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
  },
});

async function getSignedUrl(key) {
  return new Promise((resolve, reject) => {
    const params = { Bucket: process.env.AWS_BUCKET_NAME, Key: key };
    S3.getSignedUrl('getObject', params, (err, url) => {
      if (err) reject(err);
      resolve(url);
    });
  });
}

export const uploadFile = async (file: any) => {
  const fileStream = fs.createReadStream(file.path);

  let params;
  const fileName = `uploaded_on_${Date.now()}.jpg`;
  params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileStream,
  };

  try {
    S3.upload(params, (e: any, data: any) => {
      if (e) {
        console.log(e);
        throw new Error(e);
      }
      params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Expires: 60,
      };
    }).promise();
    const URL = await getSignedUrl(fileName);
    return URL;
  } catch (e) {
    console.error(e);
  }
};
export const getFileStream = (fileKey: string) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME,
  };
  return S3.getObject(downloadParams).createReadStream();
};
