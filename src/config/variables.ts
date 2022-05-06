 interface VarI{
     PORT:number,
     MONGO_URI:string,
     JWT_SECRET:string
 }

export const variables:VarI = {
    PORT:3004,
    MONGO_URI:"mongodb+srv://todoAppUser:Slytherin007@cluster0.1prpl.mongodb.net/ordergoat?retryWrites=true&w=majority",
    JWT_SECRET:"ashdfjhasdlkjfhalksdjhflakalshetsbmxyheztupwuqurmsewramylfjstevdcieidmbcnvmrjrkdkdldjf"
}