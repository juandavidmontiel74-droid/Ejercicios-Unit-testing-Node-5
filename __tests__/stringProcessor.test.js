const { maskEmail, reverseWords, extractHashtags } = require('../src/stringProcessor');

// ---------------- maskEmail ----------------
describe('maskEmail', () => {
  test('debe enmascarar un email normal', () => {
    expect(maskEmail("sergio@gmail.com")).toBe("s*****o@gmail.com");
  });

  test('si el usuario tiene 1 caracter, devuelve el email igual', () => {
    expect(maskEmail("a@test.com")).toBe("a@test.com");
  });

  test('debe lanzar error si no contiene @', () => {
    expect(() => maskEmail("correoInvalido.com")).toThrow(Error);
  });
});

// ---------------- reverseWords ----------------
describe('reverseWords', () => {
  test('invierte palabras en una oración normal', () => {
    expect(reverseWords("hola mundo node")).toBe("node mundo hola");
  });

  test('maneja múltiples espacios', () => {
    expect(reverseWords("  hola   mundo   ")).toBe("mundo hola");
  });

  test('devuelve "" si el texto está vacío o solo espacios', () => {
    expect(reverseWords("     ")).toBe("");
  });

  test('funciona con una sola palabra', () => {
    expect(reverseWords("hola")).toBe("hola");
  });
});

// ---------------- extractHashtags ----------------
describe('extractHashtags', () => {
  test('extrae múltiples hashtags', () => {
    expect(extractHashtags("Me gusta #node y #testing")).toEqual(["#node", "#testing"]);
  });

  test('devuelve [] si no hay hashtags', () => {
    expect(extractHashtags("No hay etiquetas aquí")).toEqual([]);
  });

  test('ignora # sin texto después', () => {
    expect(extractHashtags("Esto es raro # pero #node si cuenta")).toEqual(["#node"]);
  });
});