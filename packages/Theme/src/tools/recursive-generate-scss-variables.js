function generateScssVariables({ theme, varSeed = '--', scssSeed = '' }) {
    return Object.keys(theme)
        .map(key => {
            const nextValue = theme[key];

            if (typeof nextValue === 'object') {
                return generateScssVariables({
                    theme: nextValue,
                    varSeed: `${varSeed}${key}-`,
                    scssSeed: `${scssSeed}${key}-`,
                });
            }

            return `$${scssSeed}${key}: var(${varSeed}${key}, ${nextValue});
`;
        })
        .join('');
}

module.exports = generateScssVariables;
