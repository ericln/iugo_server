import crypto from 'crypto';

const HashAlgorithm = 'sha1';
const OutDigest = 'hex';
const Key = 'NwvprhfBkGuPJnjJp77UPJWJUpgC7mLz';

function validateTransaction(
  transactionId, userId, currencyAmount, verifier
) {
  let text = `${Key}${transactionId}${userId}${currencyAmount}`;
  let hash = crypto.createHash(HashAlgorithm).update(text).digest(OutDigest);
  return verifier === hash;
}

export default {
  validateTransaction
}