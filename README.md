# CipherProject
This Project is a web application that allows users to encrypt and decrypt text messages using various cipher algorithms. The supported algorithms are 3DES, AES, and OTS. The application also includes authentication features to ensure that only authorized users can access their encrypted messages.

# Features
  * User authentication and authorization with JWT tokens
  * Encryption of text messages using the following algorithms:
  * 3DES (Triple Data Encryption Standard)
  * AES (Advanced Encryption Standard)
  * OTS (One-Time Pad Cipher)
* Decryption of previously encrypted messages
* Ability to specify encryption and decryption keys
* User-friendly interface for easy encryption and decryption

# Installation
* Clone the repository: git clone https://github.com/ebisadugna/CipherProject.git
 ## Install dependencies:
  *  In the root directory, run npm install to install client-side dependencies.
  * In the server directory, run npm install to install server-side dependencies.
  
## Start the server: 
* Navigate to server directory, 
* run npm run build
* run npm run start
  This will start the server at http://localhost:3001.
## Start the client: 
In the root directory
* run npm start
* . This will start the client at http://localhost:3000.

# Usage
* Create an account or log in with an existing one. 
* On the home page, enter the text to be encrypted and choose the cipher algorithm.
* Click the "Encrypt" button to encrypt the message.
* To decrypt a message, enter the encrypted message if there isn't any in the Encrypted text field along with the cipher algorithm and the decryption key.
* Click the "Decrypt" button to decrypt the message.
# Algorithms
## 3DES
3DES (Triple Data Encryption Standard) is a symmetric-key encryption algorithm that applies DES (Data Encryption Standard) three times to increase security. It uses a 64-bit block size and a 56-bit key size.

## AES
AES (Advanced Encryption Standard) is a symmetric-key encryption algorithm that uses a block cipher with a variable block size and key size. It is widely used and considered to be highly secure.

## OTS
OTS (One-Time Pad Cipher) is a symmetric-key encryption algorithm that uses a random key to encrypt each message. It is considered to be unbreakable if used correctly, but requires a very large amount of random data for the key.
