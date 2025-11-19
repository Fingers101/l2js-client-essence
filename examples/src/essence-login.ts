import Client from "l2js-client/Client";
import { MobiusEssenceProfile } from "l2js-client/config/L2Profile";
import MMOConfig from "l2js-client/mmocore/MMOConfig";

const host = process.env.L2_HOST ?? "127.0.0.1";
const port = Number(process.env.L2_LOGIN_PORT ?? 2106);
const username = process.env.L2_USERNAME ?? "";
const password = process.env.L2_PASSWORD ?? "";
const serverId = process.env.L2_SERVER_ID ? Number(process.env.L2_SERVER_ID) : undefined;

const client = new Client(MobiusEssenceProfile);

client.once("PacketReceived:UserInfo", (event: any) => {
  console.log("Mobius Essence UserInfo received", event.data.packet);
});

async function run(): Promise<void> {
  if (!username || !password) {
    throw new Error("L2_USERNAME and L2_PASSWORD environment variables are required");
  }

  const config: MMOConfig = {
    ...new MMOConfig(),
    Username: username,
    Password: password,
    Ip: host,
    Port: port,
    ...(serverId ? { ServerId: serverId } : {}),
  };

  await client.enter(config);
}

run().catch((error) => {
  console.error("Essence login script failed", error);
  process.exitCode = 1;
});
