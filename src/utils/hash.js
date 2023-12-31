import bcrypt from 'bcrypt'
export const hashPassword = async (password, saltRounds = 10) => {
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(saltRounds)
  
      // Hash password
      return await bcrypt.hash(password, salt)
    } catch (error) {
      console.log(error)
    }
  
    // Return null if error
    return null
  }
  export const comparePassword = async ( hash,password) => {
    try {
      // Compare password
      return await bcrypt.compare(password, hash)
    } catch (error) {
      console.log(error)
    }
  
    // Return false if error
    return false
  }