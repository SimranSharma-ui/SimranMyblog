const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const createTokenAndSaveCookies = async (userId, res) => {
  try {
   
    const token = jwt.sign({ userId }, process.env.jwt_token, {
      expiresIn: "30d", 
    });

    
    res.cookie("jwt", token, {
      httpOnly: true, // Temporarily set to false for testing
      secure: false,
      sameSite: "lax",
      path: "/", // Ensure the cookie is available throughout the site
    });

   
    const user = await userModel.findByIdAndUpdate(userId, { token }, { new: true });
    
    if (!user) {
      throw new Error('User not found');
    }

    return token;
  } catch (error) {
    console.error('Error in createTokenAndSaveCookies:', error);
    throw new Error('Failed to create token or save cookie');
  }
};



module.exports = { createTokenAndSaveCookies };
