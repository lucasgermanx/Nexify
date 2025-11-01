import dotenv from 'dotenv';
dotenv.config();

/**
 * Config class
 *
 * This class contains configuration settings for bcrypt and JWT.
 */
export class AuthConfig {
    /**
     * Bcrypt configuration
     */
    public bcryptConfig = {
      saltRounds: 10, // Number of salt rounds for hash generation
    }
    
    /**
     * JWT configuration
     */
    public jwtConfig = {
      secretKey: process.env.SECRET_SESSION, // Secret key for token signing
      expiresIn: '7d', // Token expiration time
      algorithm: 'HS256', // Encryption algorithm used
    };
}
  