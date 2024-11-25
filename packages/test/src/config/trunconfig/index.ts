import { TrunConfig } from "@j.u.p.iter/jtrun-config";

const trunConfig = new TrunConfig(
  "./src/config/trunconfig/fixtures/trunconfig.json",
);

const logDataFromConfig = async () => {
  const configData = await trunConfig.load();

  console.log("CONFIG_DATA:", configData);
};

logDataFromConfig();
