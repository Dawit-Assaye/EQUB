const mongoose= require('mongoose');


// mongoose.Promise = global.Promise;
// const virtualBankDBConnection=mongoose.createConnection(process.env.MONG_URIVB, { useNewUrlParser: true,
//     useUnifiedTopology: true});
//     virtualBankDBConnection.on('open',() => {
//         console.log('Connected to VirtualBanksDB')
        
//         }).on('',(error) => {
//           console.log('Failed to connect to VirtualBanksDB:', error);
//         });
  
// module.exports = {virtualBankDBConnection};