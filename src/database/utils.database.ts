export const insertInto = async (
  DBInstance: any,
  tableName: string,
  params: string,
  values: string
) => {
  DBInstance.query(`INSERT INTO ${tableName} (${params}) VALUES(${values})`);
};
