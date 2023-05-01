const mongoose=require('mongoose')
const equberAccountSchema=require('../schemas/equberAccountSchema')
const equbAccountSchema=require('../schemas/equbAccountSchema')

const conn=mongoose.createConnection(process.env.MONG_URIVB, { useNewUrlParser: true,
      useUnifiedTopology: true})
 conn.on('open',() => {
        console.log('Connected to VirtualBanksDB')
        
        }).on('error',(error) => {
          console.log('Failed to connect to VirtualBanksDB:', error);
        });

        equberAccountSchema.statics.register=async function({account_number,balance,equber_name,pin}){
        const equberAccount=await this.create({account_number,balance,equber_name,pin})
          
        return equberAccount;
      }

      equbAccountSchema.statics.register=async function({account_number,balance,equb_name}){
        const equbAccount=await this.create({account_number,balance,equb_name})
          
        return equbAccount;
      }

      const EquberAccount=conn.model('EquberAccount',equberAccountSchema)
      const EqubAccount=conn.model('EqubAccount',equbAccountSchema)
      
      module.exports={
        EquberAccount:EquberAccount,
        EqubAccount:EqubAccount
      }