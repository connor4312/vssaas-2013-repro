const { createConnection } = require('net');

const cnx = createConnection({ port: Number(process.argv[3]), host: process.argv[2] });

cnx.on('error', err => {
  throw err;
});

const toWrite = '1f8b080000000000000a948fcd6e83301084fb2c7b86ca607e0cb70045caa997bcc0020bb1446c641b4515cabbd74e5af5dcdbecec7ca3dd036ee4ae7a821a2e681672efe81c8e579a2efa6540041b1abc59a80fb064add4ea1cf2652344ca932e6babbc6dbaf623cf8a46145d2bfab22cfaca83eed97056b30ef0cf145812c8785ace31af8639ce18e331523ac7e95472864381f9f4e4bf36f2e9c1e8bb25130ce9d6e078b99bf5257e0f86da999d2218519dc6d11ffab991f2543de36ae911c11da5936ae9b5e968d897e56ff7783b40fa8284b1240243765fddbfdff52ddf000000ffff';


cnx.on('connect', () => {
  console.log('connected, writing:', toWrite);
  cnx.write(Buffer.from(toWrite, 'hex'), () => {
    console.log('done, closing');
    cnx.end();
  });
});
