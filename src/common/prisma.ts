import {PrismaClient} from '@prisma/client';

 const prisma = new PrismaClient({
   datasources: {
      db:{
         url: process.env.NODE_ENV === 'test' ? "file:./test/db.sqlite" : process.env.DATABASE_URL,
      }
   }
 });

 export default prisma;