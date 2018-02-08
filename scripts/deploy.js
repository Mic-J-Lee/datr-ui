const s3 = require('s3')

const client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

const params = {
  localDir: 'dist',
  deleteRemoved: true,

  s3Params: {
    Bucket: 'aws-website-dateomatic-bnrqy'
  }
}

const uploader = client.uploadDir(params)

uploader.on('error', (err) => {
  console.error('unable to sync:', err.stack)
})

uploader.on('progress', () => {
  console.log('progress', uploader.progressAmount, uploader.progressTotal)
})

uploader.on('end', () => {
  console.log('done uploading')
})
