import User from "../model/UserModel";
import bcrypt from "bcrypt";

const registerUser = async (email: string, password: string) => {
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new Error("User already existing.");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email: email, password: hashedPassword });
    return { id: user.id, email: email };
  } catch (error) {
    console.error("Error occured while registering user: ", error);
  }
};

const validateUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;
    return { id: user.id, email: user.email };
  } catch (err) {
    throw new Error(`Error occurred while validating user ${err}`);
  }
};

export { registerUser, validateUser };
