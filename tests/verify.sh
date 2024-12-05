set -eu

main() {
  removePluginPackage "➖Removing the dependency on the plugin package, if present..."

  createPluginPackage

  addPluginPackage

  cleanupDocumentation

  runPlugin

  runTests

  removePluginPackage "🚮Removing the dependency on the plugin package, for cleanup..."

  echo "✅Tests passed!"
}

removePluginPackage() {
  local description="$1"

  echo "$description"

  pnpm remove @giancosta86/typedoc-readonly > /dev/null 2>&1 || true
}

createPluginPackage() {
  pushd ..

  echo "🧹Cleaning the plugin project..."
  pnpm clean

  echo "🧁Building the plugin project..."
  pnpm build

  echo "📦Creating the plugin package..."
  pnpm pack

  popd
}

addPluginPackage() {
  echo "➕Installing the plugin package..."
  pnpm add ../giancosta86*.tgz
}

cleanupDocumentation() {
  echo "🧹Removing generated test documentation, if existing..."
  rm -rf website
}

runPlugin() {
  echo "📚Now running TypeDoc to test the plugin..."
  pnpm typedoc --options typedoc.js --tsconfig tsconfig.json
}

runTests() {
  echo "🐞Running the plugin tests..."
  python3 tests.py
}

main