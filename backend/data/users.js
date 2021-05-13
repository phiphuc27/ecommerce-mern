import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Phi Phuc',
    email: 'phiphuc@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
