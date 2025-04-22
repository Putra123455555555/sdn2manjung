import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const KontakSekolah = db.define(
  'KontakSekolah',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkMaps: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    telepon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    linkFacebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkTwitter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkInstagram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkPpdb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'kontak_sekolah',
    timestamps: true,
    freezeTableName: true,
  }
);

export default KontakSekolah;
