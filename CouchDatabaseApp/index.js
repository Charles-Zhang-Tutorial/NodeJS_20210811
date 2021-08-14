// To Execute (on Bash): npm rebuild && node index.js
// To Execute (on PowerShell): npm rebuild; node index.js
// Reference: https://docs.couchbase.com/nodejs-sdk/current/hello-world/start-using-sdk.html

const couchbase = require('couchbase');

async function main(){
    // Connect to custer
    const cluster = new couchbase.Cluster("couchbase://localhost", {
        username: "Administrator",
        password: "password"
    });

    const bucket = cluster.bucket("travel-sample");
    const collection = bucket.scope("inventory").collection("airline");     // get a reference to a collection

    // Helper function for upserting
    const upsertDocument = async (doc) => {
        try {
            // key will equal: "airline_8091"
            const key = `${doc.type}_${doc.id}`;
            const result = await collection.upsert(key, doc);
            console.log("Upsert Result: ");
            console.log(result);
        } catch (error) {
            console.log('Upsert failed');
            console.error(error);
        }
    };

    // Helper function for retriving
    const getAirlineByKey = async (key) => {
        try {
            const result = await collection.get(key);
            console.log("Get Result: ");
            console.log(result);
            } catch (error) {
            console.error(error);
            }
        };

    // Prepare some data
    const airline = {
        type: "airline",
        id: 8091,
        callsign: "CBS",
        iata: null,
        icao: null,
        name: "Couchbase Airways",
      };

    // Try upsert
    // await upsertDocument(airline);

    // Rry retrive
    await getAirlineByKey("airline_10");
}

main();