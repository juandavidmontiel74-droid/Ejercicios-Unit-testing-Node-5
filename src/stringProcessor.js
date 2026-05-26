function maskEmail(email) {
  if (!email.includes('@')) {
    throw new Error('Email inválido: falta @');
  }

  const [user, domain] = email.split('@');

  if (user.length <= 1) {
    return email; // No se enmascara
  }

  const masked = user[0] + '*'.repeat(user.length - 1) + user[user.length - 1];

  return masked + '@' + domain;
}

function reverseWords(sentence) {
  if (!sentence.trim()) {
    return "";
  }

  return sentence
    .trim()
    .split(/\s+/)
    .reverse()
    .join(' ');
}

function extractHashtags(text) {
  const matches = text.match(/#\w+/g);
  return matches ? matches : [];
}

module.exports = { maskEmail, reverseWords, extractHashtags };