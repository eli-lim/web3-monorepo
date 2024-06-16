import { defineConfig } from '@wagmi/cli';
import { actions, foundry } from '@wagmi/cli/plugins';

const config: ReturnType<typeof defineConfig> = defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    actions(),
    foundry({
      artifacts: 'node_modules/@repo/contracts-foundry/out/',
      exclude: [
        // the following are provided by forge-std and should not be included in the generated file
        'MockERC20.sol/**',
        'MockERC721.sol/**',
        'Common.sol/**',
        'Components.sol/**',
        'Script.sol/**',
        'StdAssertions.sol/**',
        'StdInvariant.sol/**',
        'StdError.sol/**',
        'StdCheats.sol/**',
        'StdMath.sol/**',
        'StdJson.sol/**',
        'StdStorage.sol/**',
        'StdUtils.sol/**',
        'Vm.sol/**',
        'console.sol/**',
        'console2.sol/**',
        'Test.sol/**',
        'test.sol/**',
        '**.s.sol/*.json',
        '**.t.sol/*.json',
      ],
    }),
  ],
});

export default config;
