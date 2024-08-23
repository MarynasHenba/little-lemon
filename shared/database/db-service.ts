import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import { MenuItemProps } from '../../screens/Home';

enablePromise(true);
const tableName = 'menuItems';

export const getDBConnection = async () => {
  try {
    return openDatabase({ name: 'LittleLemonCapstoneProject.db', location: 'default' });
  } catch (error) {
    console.error('Error opening database:', error);
    throw new Error('Failed to get database connection!');
  }
};

export const createTable = async (db: SQLiteDatabase) => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
        uuid INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT,
        image TEXT,
        category TEXT NOT NULL
    );`;
    await db.executeSql(query);
    console.log(`Table ${tableName} created or already exists.`);
  } catch (error) {
    console.error('Error creating table:', error);
    throw new Error('Failed to create table!');
  }
};

export const getMenuItems = async (db: SQLiteDatabase): Promise<MenuItemProps[]> => {
  const menuItems: MenuItemProps[] = [];
  try {
    const results = await db.executeSql(`SELECT * FROM \`${tableName}\``);
    if (results && results.length > 0) {
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          menuItems.push(result.rows.item(index));
        }
      });
    }

    return menuItems;

  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw new Error('Failed to get menu items!');
  }
};

export const saveItems = async (db: SQLiteDatabase, items: MenuItemProps[]) => {
  if (!items || items.length === 0) {
    return;
  }

  const insertPromises = items.map(item => {
    const insertQuery = `
      INSERT OR REPLACE INTO ${tableName} (name, price, description, image, category) 
      VALUES (?, ?, ?, ?, ?);
    `;
    return db.executeSql(insertQuery, [item.name, item.price, item.description, item.image, item.category]);
  });

  await Promise.all(insertPromises);
};

export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE FROM ${tableName} WHERE uuid = ?`;
  await db.executeSql(deleteQuery, [id]);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  try {
    const query = `DROP TABLE IF EXISTS ${tableName}`;
    await db.executeSql(query);
    console.log(`Table ${tableName} deleted.`);
  } catch (error) {
    console.error('Error deleting table:', error);
    throw new Error('Failed to delete table!');
  }
};
export const filterByQueryAndCategories = async (db: SQLiteDatabase, activeCategories: string[], query: string) => {
  const menuItems: MenuItemProps[] = [];
  const formattedCategories = activeCategories.map((el) => el.toLowerCase());
  const categoryPlaceholders = activeCategories.map(() => '?').join(', ');
  const searchQuery = `%${query}%`;

  const sqlQuery = `SELECT * FROM ${tableName} WHERE name LIKE ? AND category IN (${categoryPlaceholders})`;
  try {
    const results = await db.executeSql(sqlQuery, [searchQuery, ...formattedCategories]);
    if (results && results.length > 0) {
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          menuItems.push(result.rows.item(index));
        }
      });
    }

    return menuItems;

  } catch (error: any) {
    console.error('Error executing SQL query:', error.message);
    throw new Error('Failed to get menu items!');
  }
};
