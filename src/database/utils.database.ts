export const insertInto = async (
  DBInstance: any,
  tableName: string,
  params: string,
  values: string
) => {
  await DBInstance.query(
    `INSERT INTO ${tableName} (${params}) VALUES(${values})`
  );
};
