// tests/Ui/data/testData.ts

export const TEST_DATA = {
 
  invalidUser: {
    email: 'wrong-email',
    password: '123',
    existingEmail: "ahmed00@yahoo.com",
    existingUsername: "existingUser1234",
    existingPassword:"0934604873"
  },
   "messages": {
    "longUsername": "username is too long (maximum is 20 characters)",
    "shortUsername": "username is too short (minimum is 3 characters)",
    "invalidEmail": "email is invalid",
    "shortPassword": "password is too short (minimum is 8 characters)",
    "existingUsername": "username has already been taken",
    "existingEmail": "email has already been taken",
    "invalidLoginCredentials": "email or password is invalid"
  }

};

export const generateRandomUser = () => {
  const randomId = Math.floor(Math.random() * 10000);
  return {
    username: `user_${randomId}`,
    email: `testuser_${randomId}@gmail.com`,
    password: 'Password123!',
  };
}