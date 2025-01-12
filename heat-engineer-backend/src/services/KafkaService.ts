import { Kafka, Partitioners } from "kafkajs";

const Broker = () => {
    const kafka = new Kafka({
        clientId: "heat-stock-app",
        brokers: ["localhost:9092"]
    })
    return kafka;
}


const StockProducer = (kafka: Kafka) => {
    // Producer to emit messages to broker
    try{
        const producer = kafka.producer({createPartitioner: Partitioners.LegacyPartitioner});
        return producer;
    } catch (error) {
        throw new Error("Could not connect to broker");
    }
}

const StockConsumer = (kafka: Kafka) => {
    // Consumes messages
    const consumer = kafka.consumer( {groupId: "test-group"} );
    return consumer;
    // await consumer.connect();
    // await consumer.subscribe( {topic: "first_topic", fromBeginning: true} );
    // return consumer;
    // await consumer.run({
    //     eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
    //         console.log({
    //             key: message.key?.toString(),
    //             value: message.value?.toString(),
    //             headers: message.headers,
    //         })
    //     },
    // })
}

export { Broker, StockProducer, StockConsumer };