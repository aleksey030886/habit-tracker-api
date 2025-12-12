import User from "../models/User";
import bcrypt from "bcrypt";

class UserService {
  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(id: number) {
    return await User.findByPk(id);
  }

  async getUserByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async validatePassword(user: User, password: string) {
    return await bcrypt.compare(password, user.password);
  }

  async registerUser(userData: {
    email: string;
    password: string;
    name: string;
  }) {
    return await User.create({
      email: userData.email.trim().toLowerCase(),
      password: await bcrypt.hash(userData.password, 10),
      name: userData.name.trim(),
    });
  }

  async updateUser(
    id: number,
    updateData: {
      email: string;
      password: string;
      name: string;
    },
  ) {
    const user = await User.findByPk(id);

    if (!user) return null;
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    return await user.update(updateData);
  }

  async deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.destroy();
    return { message: "User deleted" };
  }
}

export default new UserService();
