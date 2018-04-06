Finds all systems within distance of target system, default parameters:

    const system_to_find = 'Lembava';
    const max_distance = 80.0;

Instructions
############

Build against nodejs v8.9.x

If using NVM Node Version Manager:

    node -v
    
note full version number

    nvm install 8.9
    nvm alias default <full 8.9.x version>
    nvm uninstall <previous version>

Then, install `yarn` globally with:

    npm install -g yarn
    
Then, initialize with

    yarn

Finally, we can run yarn commands available in the package.json `scripts` key:

    yarn run dev
    

Notes
#####

`/src` is generated into `/api`, therefore `/api` should be considered temporary and no changes should be made to it