import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const ProfilSekolah = db.define(
  'ProfilSekolah',
  {
    namaSekolah: { type: DataTypes.STRING, allowNull: false },
    motto: { type: DataTypes.TEXT, allowNull: false },
    kepalaSekolah: { type: DataTypes.STRING, allowNull: false },
    tentang: { type: DataTypes.TEXT, allowNull: false },
    tujuan: { type: DataTypes.TEXT, allowNull: false },
    strategi: { type: DataTypes.TEXT, allowNull: false },
    visi: { type: DataTypes.TEXT, allowNull: false },
    strukturImg: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'profil_sekolah', 
    timestamps: true,
    freezeTableName: true,
  }
);

export default ProfilSekolah;
