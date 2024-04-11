function levenshteinDistance(s1, s2) {
    const len1 = s1.length;
    const len2 = s2.length;
    
    // Creamos una matriz para almacenar los valores de distancia
    const matrix = [];
    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }
    
    // Llenamos la matriz utilizando el algoritmo de Levenshtein
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // Substitución
                    matrix[i][j - 1] + 1,     // Inserción
                    matrix[i - 1][j] + 1      // Eliminación
                );
            }
        }
    }
    
    // La distancia de Levenshtein está en la última celda de la matriz
    return matrix[len1][len2];
}

export function isSimilar(s1, s2, threshold) {
    const maxLen = Math.max(s1.length, s2.length);
    const distance = levenshteinDistance(s1, s2);
    const similarity = 1 - (distance / maxLen);
    return similarity >= threshold;
}
