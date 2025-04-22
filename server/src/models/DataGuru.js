import { DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';

const DataGuru = sequelize.define(
  'DataGuru',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'data_guru',
    timestamps: true,
    freezeTableName: true,
  }
);

export default DataGuru;
