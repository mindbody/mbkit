type RecursiveCssVariableCreator = {
    // typescript complains if this is type `Theme` because of the mapping on when getting `nextValue` because it can't infer the type
    theme: any;
    seed?: string;
};

export function recursiveCssVariableCreator(props: RecursiveCssVariableCreator): string {
    const { theme, seed = '--' } = props;
    return Object.keys(theme)
        .map(key => {
            const nextValue = theme[key];
            if (typeof nextValue === 'object') {
                return recursiveCssVariableCreator({ theme: nextValue, seed: `${seed}${key}-` });
            }

            return `${seed}${key}: ${nextValue};`;
        })
        .join('');
}
