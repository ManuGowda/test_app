/* eslint-disable @typescript-eslint/no-empty-function */
import { Application } from 'lisk-sdk';
import { HelloWorldModule } from "./modules/hello_world/hello_world_module";

export const registerModules = (app: Application): void => {
    app.registerModule(HelloWorldModule);
};
