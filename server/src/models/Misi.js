import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import ProfilSekolah from './Profil.js';

const Misi = db.define(
  'Misi',
  {
    profilSekolahId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProfilSekolah,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    text: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: 'misi', 
    timestamps: true,
    freezeTableName: true,
  }
);

// Relasi One-to-Many (ProfilSekolah → Misi)
ProfilSekolah.hasMany(Misi, { foreignKey: 'profilSekolahId', as: 'misi', onDelete: 'CASCADE' });
Misi.belongsTo(ProfilSekolah, { foreignKey: 'profilSekolahId', as: 'profilSekolah' });

export default Misi;
