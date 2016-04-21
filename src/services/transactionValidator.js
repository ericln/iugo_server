import crypto from 'crypto';

const HashAlgorithm = 'sha1';
const OutDigest = 'hex';

function validateTransaction(
  key, transactionId, userId, currencyAmount, verifier
) {
  let text = `${key}${transactionId}${userId}${currencyAmount}`;
  let hash = crypto.createHash(HashAlgorithm).update(text).digest(OutDigest);
  console.log({
    hash,
    verifier
  });
  return verifier === hash;
}

export default {
  validateTransaction
}