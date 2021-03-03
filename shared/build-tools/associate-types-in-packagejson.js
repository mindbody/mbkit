const getFiles = require('node-recursive-directory');
const fs = require('fs');

try {
    getFiles('./packages/**/dist/cjs').then(files => {
        // find all index.d.ts
        const allIndexDefinitions = files.filter(file => file.includes('index.d.ts'));
        // clean up leading paths (everything before "/packages/")
        const trimmedLocation = allIndexDefinitions.map(file => {
            const indexOfPackages = file.indexOf('/packages/');
            const cleanLeading = file.substr(indexOfPackages, file.length);
            return cleanLeading;
        });
        // now make them an array of just strings e.g. [['packages', 'ComponentName', 'cjs', 'index.d.ts'], [...]]
        const filesSplit = trimmedLocation.map(file => file.split('/').filter(part => part !== ''));

        // write back to each package.json with the type location
        filesSplit.forEach((file, index) => {
            // get package.json for specific component
            const packageJsonLocation = `${file[0]}/${file[1]}/package.json`;
            let rawJson = fs.readFileSync(packageJsonLocation);
            let packageJson = JSON.parse(rawJson);

            // remove 'packages' and 'ComponentName' from arr
            let typesLocationMinusPackageLocation = [...file];
            typesLocationMinusPackageLocation.splice(0, 2);

            // update types
            packageJson['types'] = typesLocationMinusPackageLocation.join('/');

            // then write to it's "types": "...." location
            fs.writeFileSync(packageJsonLocation, `${JSON.stringify(packageJson, null, 4)}\r\n`);
        });
    });
} catch (e) {
    console.error(e);
    exit(1);
}
