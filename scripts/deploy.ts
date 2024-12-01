import dotenv from 'dotenv'
dotenv.config()

import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519"
import { fromB64 } from "@mysten/sui.js/utils"
import { SuiClient } from "@mysten/sui.js/client"
import { execSync } from "child_process"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import process from "process"

const priv_key = process.env.PRIVATE_KEY
if (!priv_key) {
    console.log("Error: PRIVATE_KEY not set in .env")
    process.exit(1)
}

const keypair = Ed25519Keypair.fromSecretKey(fromB64(priv_key).slice(1))
const client = new SuiClient({ url: "https://fullnode.devnet.sui.io:443" })

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const path_to_contracts = join(__dirname, "../move/counter")

execSync(`sui move build --dump-bytecode-as-base64 --path ${path_to_contracts}`, { encoding: "utf-8" })