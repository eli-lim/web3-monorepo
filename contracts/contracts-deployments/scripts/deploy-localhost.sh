echo "Deploying to localhost...";

# Deploy the contract(s) with a pre-funded test-only private key provided by Anvil
forge create \
  --rpc-url localhost:8545 \
  --private-key 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6 \
   "$(pwd)/node_modules/@repo/contracts-foundry/src/NameService.sol:NameService";

echo "Deployed! 🚀";
