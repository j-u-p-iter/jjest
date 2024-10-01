import { TSConfig } from '@j.u.p.iter/jtrun-config';

const tsConfig = new TSConfig('./src/config/tsconfig/fixtures/tsconfig.json');

const logDataFromConfig = async () => {
  const configData = await tsConfig.load();

  console.log("CONFIG_DATA:", configData);
};

logDataFromConfig();
