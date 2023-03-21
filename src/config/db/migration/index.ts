import mongoose from 'mongoose';
// import { DateTime } from 'luxon';
// import { Migration, Date as DateModel } from '../models';
// import { DateSchema } from '../models/Date';

export const migration = async () => {
  const prodDB = mongoose.createConnection(process.env.MONGODB_PROD_URI as string);

  if (prodDB) {
    try {
      // * Implement migration
      // const [migration] = await Migration.find();
      // const [year, month, date] = `${migration.lastMigration}`.split('-');
      // const today = DateTime.now().setZone('America/Mexico_City');
      // const last = DateTime.fromObject({
      //   year: Number(year),
      //   month: Number(month),
      //   day: Number(date),
      // }).setZone('America/Mexico_City');

      // const difference = Math.floor(Number(today.diff(last, 'days').toObject().days));
      // let newDates: unknown[] = [];

      // if (difference > 15) {
      //   prodDB
      //     .model('Date', DateSchema)
      //     .find({ created_at: { $gt: last.toJSDate() } })
      //     .then((result: unknown[]) => {
      //       if (result.length > 0) {
      //         newDates = [...result];
      //       }
      //     });

      //   if (newDates.length > 0) {
      //     await DateModel.insertMany([...newDates]);
      //   }

      //   migration.lastMigration = DateTime.now().toFormat('yyyy-MM-dd');
      //   migration.save();

      //   console.log('Migration done it');
      // }

      // console.log('There are no more than 15 new dates');
      // prodDB.close();

      process.exit(1);
    } catch (error) {
      console.log(error);
    }
  }
};
