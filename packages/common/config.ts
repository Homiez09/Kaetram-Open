import dotenv from 'dotenv-extended';
import dotenvParseVariables from 'dotenv-parse-variables';
import { camelCase } from 'lodash';

import type { DatabaseTypes } from './types/database';

export interface Config {
    name: string;
    host: string;
    ssl: boolean;
    threads: number;

    socketioPort: number;
    websocketPort: number;

    serverId: number;
    accessToken: string;
    apiEnabled: boolean;
    apiPort: number;

    hubEnabled: boolean;
    hubHost: string;
    hubPort: number;
    hubPing: number;
    hubAccessToken: string;
    remoteServerHost: string;

    clientRemoteHost: string;
    clientRemotePort: number;

    cleanupThreshold: number;
    cleanupTime: number;

    database: DatabaseTypes;
    skipDatabase: boolean;

    mongodbHost: string;
    mongodbPort: number;
    mongodbUser: string;
    mongodbPassword: string;
    mongodbDatabase: string;
    mongodbSrv: boolean;
    mongodbTls: boolean;

    worldSwitch: boolean;
    tutorialEnabled: boolean;
    overrideAuth: boolean;
    maxPlayers: number;
    updateTime: number;
    gver: string;

    discordEnabled: boolean;
    discordChannelId: string;
    discordBotToken: string;

    debugging: boolean;
    debugLevel: 'all';
    fsDebugging: boolean;
}

let env = dotenv.load({
        path: `../../.env`,
        defaults: '../../.env.defaults',
        includeProcessEnv: true
    }),
    { NODE_ENV } = env;

if (NODE_ENV) Object.assign(env, dotenv.load({ path: `../../.env.${NODE_ENV}` }));

let envConfig = dotenvParseVariables(env),
    config = {} as Config;

for (let key of Object.keys(envConfig)) {
    let camelCaseKey = camelCase(key) as keyof Config;

    config[camelCaseKey] = envConfig[key] as never;
}

config.hubHost = config.hubHost || config.host;

export default config;
