// models/Chat.js
import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Chat = db.define(
  'Chat',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    socketId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender: {
      type: DataTypes.ENUM('visitor', 'admin'),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'chat',
    timestamps: true,
    freezeTableName: true,
  }
);

export default Chat;
