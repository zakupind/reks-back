import crypto from 'crypto';

const serverSeed = '1';
const clientSeed = '9ba167cfda';
const nonce = 99;

const hexGenerator = () => {
  const hmac = crypto.createHmac('sha256', serverSeed);
  hmac.update(`${clientSeed}:${nonce}`);
  hmac.update(serverSeed);

  return hmac.digest('hex');
};

const randomHex = () => {
  return crypto.randomBytes(32).toString('hex');
};

const generateFloat = () => {
  const hex = hexGenerator();

  const substr = hex.substr(0, 8);
  const maxValue = 2 ** 32 - 1;

  const numberFromSubstr = parseInt(substr, 16);
  const float = numberFromSubstr / maxValue;

  return float;
};

function createHash(value: string): string {
  const hash = crypto.createHash('sha256');
  return hash.update(value).digest('hex');
}

console.log(createHash('test'));
