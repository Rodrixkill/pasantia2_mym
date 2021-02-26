import { App } from './app'
import { connect } from './database'

async function main() {
    const app = new App(8443);
    app.listen();
}

main();