import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const DataGambar = db.define(
  'DataGambar',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    kategori: {
      type: DataTypes.ENUM('gallery', 'fasilitas'),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'data_gambar',
    timestamps: true,
    freezeTableName: true,
  }
);

export default DataGambar;
