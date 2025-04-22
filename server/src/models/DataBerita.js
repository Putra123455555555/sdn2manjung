import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const DataBerita = db.define(
  'DataBerita',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    kategori: {
      type: DataTypes.ENUM('berita', 'prestasi'),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'data_berita',
    timestamps: true,
    freezeTableName: true,
  }
);

export default DataBerita;
