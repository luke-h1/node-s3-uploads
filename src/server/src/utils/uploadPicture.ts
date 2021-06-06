import AWS from 'aws-sdk';
import fs from 'fs';

const S3 = new AWS.S3({
  signatureVersion: 's3v4',
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
  },
});

export const uploadFile = async (file: any) => {
  const fileStream = fs.createReadStream(file.path);

  let params;
  params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.filename,
    Body: fileStream,
  };

  S3.upload(params, (e, data) => {
    if (e) {
      console.log(e);
      throw new Error(e);
    }
    params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.filename,
      Expires: 60,
    };
    const signedURL = S3.getSignedUrl('getObject', params);
    return signedURL;
  });
};
