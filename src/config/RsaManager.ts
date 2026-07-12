import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

const KEYS_DIR = path.join(process.cwd(), 'keys');

class RsaManager {
  private static publicKey: string;
  private static privateKey: string;
  private static initialized = false;

  static initialize(): void {
    if (this.initialized) return;

    const publicKeyPath = path.join(KEYS_DIR, 'public.pem');
    const privateKeyPath = path.join(KEYS_DIR, 'private.pem');

    if (fs.existsSync(publicKeyPath) && fs.existsSync(privateKeyPath)) {
      this.publicKey = fs.readFileSync(publicKeyPath, 'utf8');
      this.privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    } else {
      const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      });
      fs.mkdirSync(KEYS_DIR, { recursive: true });
      fs.writeFileSync(publicKeyPath, publicKey);
      fs.writeFileSync(privateKeyPath, privateKey);
      this.publicKey = publicKey;
      this.privateKey = privateKey;
    }

    this.initialized = true;
  }

  static encrypt(plaintext: string): string {
    this.ensureInitialized();
    const buffer = crypto.publicEncrypt(
      { key: this.publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
      Buffer.from(plaintext, 'utf8'),
    );
    return buffer.toString('base64');
  }

  static decrypt(ciphertext: string): string {
    this.ensureInitialized();
    const buffer = crypto.privateDecrypt(
      { key: this.privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
      Buffer.from(ciphertext, 'base64'),
    );
    return buffer.toString('utf8');
  }

  static getPrivateKey(): string {
    this.ensureInitialized();
    return this.privateKey;
  }

  static getPublicKey(): string {
    this.ensureInitialized();
    return this.publicKey;
  }

  private static ensureInitialized(): void {
    if (!this.initialized) {
      this.initialize();
    }
  }
}

export default RsaManager;
