import * as envsub from 'envsub';
import { join } from 'path';

const YAML_CONFIG_FILENAME = './config.yaml';
const {
  //# HTTP
  PORT,
  MAX_TIMEOUT,
} = process.env;

const templateFile = join(__dirname, YAML_CONFIG_FILENAME);
const outputFile = join(__dirname, YAML_CONFIG_FILENAME);

const options = {
  all: false,
  diff: false,
  envs: [
    //# HTTP
    { name: 'PORT', value: PORT },
    { name: 'MAX_TIMEOUT', value: MAX_TIMEOUT },
  ],
  envFiles: [join(__dirname, YAML_CONFIG_FILENAME)],
  protect: false,
  syntax: 'default',
  system: true,
};

//# Overwrite config.yaml
export const envObjStart = () =>
  envsub({ templateFile, outputFile, options })
    .then(() => {
      console.log('env-sub has loaded');
    })
    .catch((err: Error) => {
      console.error(err.message);
    });
