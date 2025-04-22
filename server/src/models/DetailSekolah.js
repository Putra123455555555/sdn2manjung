import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const DetailSekolah = db.define(
  'DetailSekolah',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    noPendirian: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noSertif: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noStatistik: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    npsn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenjangAkreditas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thDidirikan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thOperasional: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusTanah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    luasTanah: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    statusBangunan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    luasBangunan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalLahan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'detail_sekolah',
    timestamps: true,
    freezeTableName: true,
  }
);

export default DetailSekolah;
