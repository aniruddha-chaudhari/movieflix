import { User } from "../models/usermodel.js";
import bcryptjs from "bcryptjs"
import { generateTokenandsetcookie } from "../utils/genrateToken.js";


export async function signup(req, res) {

    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be atleast 6 characters" });
        }

        const existingUserByEmail = await User.findOne({ email: email });

        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "email already exists" });
        }

        const existingUserByUsername = await User.findOne({ username: username });

        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password, salt);


        const PROFILE_PIC = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

        const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];

        const newUser = new User({
            email,
            username,
            password: hashedpassword,
            image

        });


        generateTokenandsetcookie(newUser._id, res);
        console.log("new user", newUser);
        await newUser.save();
        res.status(201).json({
            success: true, user: {
                ...newUser._doc,
                password: ""
            }
        });




    }
    catch (err) {
        console.log("error in sifnup", err);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all fields" });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        generateTokenandsetcookie(user._id, res);
        res.status(200).json({
            success: true, user: { ...user._doc, password: "" }
        });
    }

    catch (error) {
        console.log("error in login", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    }
    catch (error) {
        console.log("error in logout", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}


export async function authCheck(req, res) {
    try {
        console.log("authcheck", req.user);
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.log("error in authcheck", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
        console.log(error);
    }
}